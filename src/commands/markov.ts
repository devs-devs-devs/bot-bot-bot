import Command from './command';
import Reply from '../services/reply';
import { SlackEvent, SlackMessage } from '../interfaces/slack';

import Markov from '../services/markovsvc';

export class MarkovCommand extends Command {

    constructor() {
        super('markov', ['m', 'markov']);
        this.init();
    }

    async init() {
        // Does nothing
    }

    async reply(body: SlackMessage) {
        const event = body.event as SlackEvent;
        const {action, params} = this.parseText(event.text);

        const text = await Markov.reply([action, params].join(' ').trim());

        Reply({
            text
        }, event);

    }

}
