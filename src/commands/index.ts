import { Application, Request, Response } from 'express';

import Data from '../services/data';
import Reply from '../services/reply';
// import Settings from '../services/settings';
import Users from '../services/users';
import Github from '../services/github';

import { HelloWorld } from './hello-world';
import { Copypasta } from './copypasta';
import { Trigger } from './trigger';

const { VERIFICATION_TOKEN, TRIGGER_PREFIX, BOT_NAME } = process.env;

export default class BotBotBot {

    private registeredCommands: any = {};
    private triggerScan: any;

    constructor(app: Application) {

        [
            HelloWorld,
            Copypasta,
            Trigger
        ].forEach(command => {
            this.registerCommand(command, app);
        });

        Data.startAutoSave();
        Users.autoUpdateUsers();

        app.all('/', this.parseHook.bind(this));

        new Github(app);

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

        if (body) console.log('BODY', new Date().toISOString(), body);

        if (!body.hasOwnProperty('token') && body.token !== VERIFICATION_TOKEN) return res.status(401).send();

        if (body.hasOwnProperty('challenge')) return res.status(200).send(body.challenge);

        if (body.hasOwnProperty('event') && body.event.hasOwnProperty('text')) {
            if (BOT_NAME === body.event.username) return res.status(200).send();

            console.log(new Date().toISOString(), body.event.text);

            const fullText = body.event.text;

            let trigger = fullText.split(' ', 1)[0];
            let params = fullText.substring(fullText.indexOf(' ')).trim();

            if (trigger[0] === TRIGGER_PREFIX) {
                const triggerReply = registeredCommands[trigger.substring((1))];
                if (triggerReply) return Reply(req, res, fullText, triggerReply.reply(params, body.event));
            }

            // Catch all triggers
            console.log('CATCH', new Date().toISOString(), 'Trigger scan thing', body.event.text);
            this.registeredCommands.trigger.scan(req,res,body.event);

        }

        res.status(200).send('ok');

    }

}
