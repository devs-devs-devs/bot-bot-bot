import Command from './command';
import Reply from '../services/reply';
import { SlackEvent, SlackMessage } from '../interfaces/slack';

import Markov from '../services/markovsvc';

function getFileSize(filePath: string) {
    const stats: any = require('fs-extra').statSync(filePath);
    // console.log('stats', stats);
    const size: any = stats['size'];
    // convert it to humanly readable format.
    const i: any = Math.floor(Math.log(size) / Math.log(1024));
    return ((size / Math.pow(1024, i)).toFixed(2) as any) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
}

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

        //const text = await Markov.reply(`${action} ${params}`);
        Reply({
            text: getFileSize(Markov.filePath)
        }, event);

    }

}
