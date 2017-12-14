import Command from './command';
import Reply from '../services/reply';
import { SlackEvent, SlackMessage } from '../interfaces/slack';

export class Emphasis extends Command {

    constructor() {
        super('emphasis', ['e', 'emphasis']);
        this.init();
    }

    async init() {
        // Does nothing
    }

    reply(body: SlackMessage) {
        const event = body.event as SlackEvent;
        const { action, params } = this.parseText(event.text);

        const emoji = action[0] === ':' ? action : ':clap:';
        const sentence = action[0] === ':' ? params : `${action} ${params}`;

        const emphasis = sentence.split(' ').join(` ${emoji} `);

        Reply({
            text: `_${emphasis}_`
        }, event);

    }

}
