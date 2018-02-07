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

    reply(body: SlackMessage) {
        const event = body.event as SlackEvent;

        Markov.reply(event.text).then((reply: any) => {
            Reply({
                text: reply
            }, event);
        });

    }

}
