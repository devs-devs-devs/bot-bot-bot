import Command from './command';
import Data from '../services/data';
import Reply from '../services/reply';
import Users from '../services/users';
import { SlackEvent, SlackMessage } from '../interfaces/slack';

export class Copypasta extends Command {

    constructor() {
        super('copypasta', ['cp', 'copypasta']);
        this.init();
    }

    async init() {
        // Does nothing
    }

    reply(body: SlackMessage) {
        const event = body.event as SlackEvent;
        const { action, params } = this.parseText(event.text);

        const actions = ['add', 'delete'];

        if (actions.indexOf(action) !== -1) {
            if (action === 'add') return this.addAction(params, event);
            if (action === 'delete') return this.deleteAction(params, event);
        }

        return this.randomAction(params, event);

    }

    async addAction(params: string, event: SlackEvent) {
        if (!params) return;

        const insertResult = await Data.pool.query('INSERT INTO `copypasta` (`copypasta`, `user`) VALUES(?, ?)', [params, event.user]);
        if (insertResult.length) {
            Reply({
                text: `Added copypasta \`${(insertResult[0] as any).insertId}\` by <@${Users.id(event.username || event.user || '').name}>!`
            }, event);
        } else {
            Reply({
                text:`Could not complete that request ffs:
                \`\`\`
                ${JSON.stringify(insertResult)}
                \`\`\`
                `
            }, event);
        }
    }

    deleteAction(params: string, event: SlackEvent) {

    }

    async randomAction(params: string, event: SlackEvent) {

        const data = await Data.pool.query('SELECT `copypasta`, `user`, r1.id FROM `copypasta` AS r1 JOIN (SELECT CEIL(RAND() * (SELECT MAX(id) FROM `copypasta`)) AS id) AS r2 WHERE r1.id >= r2.id ORDER BY r1.id ASC LIMIT 1');
        const copypasta = (data[0] as any)[0];
        copypasta.copypasta = copypasta.copypasta.toString();

        const user = Users.id(copypasta.user).name;

        Reply({
            as_user:false,
            username:`COPYPASTA #${copypasta.id} - added by ${user}`,
            text:copypasta.copypasta
        }, event);

    }

}
