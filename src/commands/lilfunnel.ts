import Command from './command';
import Reply from '../services/reply';
import { SlackEvent, SlackMessage } from '../interfaces/slack';

export class Lilfunnel extends Command {

    constructor() {
        super('lilfunnel', ['lf', 'lilfunnel']);
        this.init();
    }

    async init() {
        // Does nothing
    }

    reply(body: SlackMessage) {
        const event = body.event as SlackEvent;

        const dueDate = new Date('2018-02-15 00:00:00');
        const currentDate = new Date();

        let message = '';

        if (currentDate > dueDate) {
            message = `I'm already back, yo!`
        } else if (currentDate < dueDate) {

            message = `I return in `;

            let totalSeconds = Math.abs((+dueDate) - (+currentDate)) / 1000;

            const days = Math.floor(totalSeconds / 86400);
            totalSeconds -= days * 84600;
            if (days) message += `${days} days `;

            const hours = Math.floor(totalSeconds / 3600) % 24;
            totalSeconds -= hours * 3600;
            if (hours) message += `${hours} hours `;

            const minutes = Math.floor(totalSeconds / 60) % 60;
            totalSeconds -= minutes * 60;
            if (minutes) message += `${minutes} minutes `;

            const seconds = totalSeconds % 60;
            if (seconds) message += `${seconds} seconds `;

        }

        Reply({
            text: `:callum2: < ( _${message}_ )`
        }, event);

    }

}
