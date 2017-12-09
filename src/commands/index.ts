import { Application, Request, Response } from 'express';

import Data from '../services/data';
import Reply from '../services/reply';
// import Settings from '../services/settings';
import Users from '../services/users';
import Github from '../services/github';

import { HelloWorld } from './hello-world';
import { Copypasta } from './copypasta';

const { VERIFICATION_TOKEN, TRIGGER_PREFIX, BOT_NAME } = process.env;

export default class BotBotBot {

    private registeredCommands: any = {};

    constructor(app: Application) {

        [
            HelloWorld,
            Copypasta
        ].forEach(command => {
            this.registerCommand(command, app);
        });

        Data.startAutoSave();
        Users.autoUpdateUsers();

        app.all('/', this.parseHook.bind(this));

    }

    registerCommand(command: any, app: Application) {
        const instantiatedCommand = new command(app);
        const { registeredCommands } = this;

        const { commands } = instantiatedCommand;

        for (let commandKey of commands) {
            const isAlreadyRegistered = !!registeredCommands[commandKey];
            if (!isAlreadyRegistered) registeredCommands[commandKey] = instantiatedCommand;
        }
    }

    parseHook(req: Request, res: Response) {
        const { body } = req;
        const { registeredCommands } = this;

        if (body) console.log(new Date().toISOString(), body);

        if (!body.hasOwnProperty('token') && body.token !== VERIFICATION_TOKEN) return res.status(401).send();

        if (body.hasOwnProperty('challenge')) return res.status(200).send(body.challenge);

        if (body.hasOwnProperty('event') && body.event.hasOwnProperty('text')) {
            if (BOT_NAME === body.event.username) return res.status(200).send();

            console.log(new Date().toISOString(), body.event.text);

            const fullText = body.event.text;

            let trigger = fullText.split(' ', 1)[0];
            let params = fullText.substring(fullText.indexOf(' ')).trim();

            if (trigger[0] !== TRIGGER_PREFIX) return res.status(200).send();

            const triggerReply = registeredCommands[trigger.substring((1))];

            if (triggerReply) return Reply(req, res, fullText, triggerReply.reply(params, body.event));



        }

        return res.status(404).send('Command not found');

    }

}
