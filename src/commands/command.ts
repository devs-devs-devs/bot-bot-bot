import Logger from '../services/logger';
import chalk from 'chalk';
import { SlackMessage } from '../interfaces/slack';

export interface CommandInterface {
    reply: any
}

export interface CommandReplyInterface {
    text: string
}

export default class Command implements CommandInterface {

    public name: string = 'hello-world';
    public cname: string;
    public commands: string[] = ['hello'];

    constructor(name: string, commands: string[]) {
        if (name && commands) {
            this.name = name;
            this.commands = commands
        }
        this.cname = chalk.magenta(this.name);
        Logger.log(this.cname, 'loaded');
    }

    reply(body: SlackMessage): void {
        // DO REPLY
    }

    parseText(text: string = ''): any {
        const splitText = text.split(' ');
        return {
            trigger:splitText.shift() || '',
            action:splitText.shift() || '',
            params:splitText.join(' ')
        }
    }

}
