import chalk from 'chalk';
import Command, { CommandReplyInterface } from './command';
import { SlackEvent, SlackMessage } from '../interfaces/slack';
import Data from '../services/data';
import Settings from '../services/settings';
import Logger from '../services/logger';
import { shuffle } from '../utils/shuffle';
import Reply from '../services/reply';

export class Trigger extends Command {

    public triggers: any;
    private lastTrigger: number = 0;
    private triggerChanceToSpeak: number;
    private triggerReplyInterval: number;

    constructor() {
        super('trigger', ['t', 'trigger']);
        this.init();
    }

    async init() {
        const triggerChanceToSpeak = await Settings.get('triggerChanceToSpeak');
        this.triggerChanceToSpeak = ~~triggerChanceToSpeak.value;

        const triggerReplyInterval = await Settings.get('triggerReplyInterval');
        this.triggerReplyInterval = ~~triggerReplyInterval.value;
    }

    reply(body: SlackMessage) {
        const event = body.event as SlackEvent;

        const { action, params } = this.parseText(event.text);

        const actions = ['add', 'delete'];

        if (actions.indexOf(action) !== -1) {
            if (action === 'add') return this.addAction(params, event);
            if (action === 'delete') return this.deleteAction(params, event);
        }
    }

    async addAction(params: string, event: SlackEvent) {
        const splitParams = params.toLowerCase().split(' ');
        if (splitParams.length < 2) return;
        const word = splitParams.shift();
        const phrase = splitParams.join(' ');

        const insertResult = await Data.pool.query('INSERT INTO `triggers` (`trigger`, `phrase`, `user`) VALUES(?, ?, ?)', [word, phrase, event.user]);
        if (insertResult.length) {
            Reply({
                text:'Added "${phrase}" as a response to *${word}*'
            }, event);
        } else {
            Reply({
                text:`Could not complete that request ffs:
                \`\`\`
                ${insertResult}
                \`\`\`
                `
            }, event);
        }
    }

    deleteAction(params: string, event: SlackEvent) {
    }

    async scan(body: SlackMessage) {
        const event = body.event as SlackEvent;

        const timeSinceLastSpoke = +new Date() - this.lastTrigger;
        const rollTheDice = Math.floor(Math.random() * 100) + 1;

        const triggerReply = timeSinceLastSpoke >= this.triggerReplyInterval || rollTheDice >= (100 - this.triggerChanceToSpeak);

        Logger.log(this.cname, chalk.blue(event.username || event.user || ''), chalk.yellow(event.text), `Roll ${rollTheDice} / 100 - Time: ${timeSinceLastSpoke}`, chalk.cyan(`Reply?: ${triggerReply}`));

        if (triggerReply) {

            const data = await Data.pool.query('SELECT `trigger` FROM `triggers` GROUP BY `trigger`');
            const keywords = (data[0] as any).map((row: any) => row.trigger);

            const text = (event.text||'').toLowerCase();
            const triggers = shuffle(text.split(' '));

            while (triggers.length) {
                const trigger = triggers.pop();

                if (trigger && keywords.indexOf(trigger) !== -1) {

                    const responses = await Data.pool.query('SELECT `phrase` FROM `triggers` WHERE `trigger` = ?', [trigger]);
                    const phrases = (responses[0] as any).map((row:any) => row.phrase);

                    const phrase = shuffle(phrases)[0];

                    if (phrase) {
                        Reply({
                            text:phrase || ''
                        }, event);
                        this.lastTrigger = +new Date();
                        break;
                    }

                }

            }

        }

    }

}
