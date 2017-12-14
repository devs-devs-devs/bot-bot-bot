import Command from './command';
import Reply from '../services/reply';
import Data from '../services/data';
import Users from '../services/users';
import { SlackEvent, SlackMessage } from '../interfaces/slack';

export class Quote extends Command {

    constructor() {
        super('quote', ['q', 'quote']);
        this.init();
    }

    async init() {
        // Does nothing
    }

    reply(body: any) {
        const event = body.event as SlackEvent;
        const { action, params } = this.parseText(event.text || event.message.text);

        const actions = ['add', 'delete'];

        if (actions.indexOf(action) !== -1) {
            if (action === 'add') return this.addAction(params, event);
            if (action === 'delete') return this.deleteAction(params, event);
        }

        return this.randomQuote(params, event);
    }

    async randomQuote(params: string, event: SlackEvent) {
        const data = await Data.pool.query('SELECT `quote`, `user`, r1.id FROM `quote` AS r1 JOIN (SELECT CEIL(RAND() * (SELECT MAX(id) FROM `quote`)) AS id) AS r2 WHERE r1.id >= r2.id ORDER BY r1.id ASC LIMIT 1');
        const quote = (data[0] as any)[0];
        quote.quote = quote.quote.toString();

        const user = Users.id(quote.user).name;

        Reply({
            as_user:false,
            username:`QUOTE #${quote.id} - added by ${user}`,
            text:quote.quote
        }, event);
    }

    async addAction(params: string, event: SlackEvent) {

        const lines: string[] = [];

        event.message.attachments.forEach((attachment: any) => {
            lines.push(`&lt; <@${attachment.author_id}> &gt; ${attachment.text}`.trim())
        });

        const insertResult = await Data.pool.query('INSERT INTO `quote` (`quote`, `user`) VALUES(?, ?)', [lines.join("\n").trim(), event.message.user]);
        if (insertResult.length) {
            Reply({
                text:`Quote added:
${lines}`
            }, event);
        } else {
            Reply({
                text:`Could not complete that request ffs:
\`\`\`
${JSON.stringify(insertResult)}
\`\`\``
            }, event);
        }

    }

    deleteAction(params: string, event: SlackEvent) {

    }

}



// test shite
// random
// {"token":"96lxtZvxgC8jkm5xelxX35UT","team_id":"T5T1MHSQL","api_app_id":"A88NC9TC6","event":{"type":"message","user":"U5TQU3WQ7","text":"!q","ts":"1513270730.000253","channel":"C8AJ155EG","event_ts":"1513270730.000253"},"type":"event_callback","event_id":"Ev8EA5M2SV","event_time":1513270730,"authed_users":["U87U6ES12"]}

// add
// setTimeout(() => {
//     this.reply({"token":"96lxtZvxgC8jkm5xelxX35UT","team_id":"T5T1MHSQL","api_app_id":"A88NC9TC6","event":{"type":"message","user":"U5TQU3WQ7","text":"!q","ts":"1513270730.000253","channel":"C8AJ155EG","event_ts":"1513270730.000253"},"type":"event_callback","event_id":"Ev8EA5M2SV","event_time":1513270730,"authed_users":["U87U6ES12"]});
// }, 5000);
