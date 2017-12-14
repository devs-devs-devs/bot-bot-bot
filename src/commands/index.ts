import { Response, Request, Application } from 'express';

import Data from '../services/data';
import Users from '../services/users';
import Channels from '../services/channels';
import Settings from '../services/settings';
import Github from '../services/github';
import Logger from '../services/logger';

import { default as Command, CommandInterface } from './command';
import { Trigger } from './trigger';
import { Copypasta } from './copypasta';
import { Emphasis } from './emphasis';
import { Quote } from './quote';

import { SlackMessage } from '../interfaces/slack';
import Reply from '../services/reply';

const { VERIFICATION_TOKEN, BOT_NAME, TRIGGER_PREFIX, REPORT_CHANNEL } = process.env;

export default class BotBotBot {

    private app: Application;
    private registeredCommands: any = {};
    private commadsToRegister: any = [
        Command,
        Trigger,
        Copypasta,
        Emphasis,
        Quote
    ];

    constructor(app: Application) {
        this.app = app;
        this.init();
        app.all('/', this.parseHook.bind(this));
        new Github(app);
    }

    // Can't have async constructors
    async init() {
        await Data.createPool();
        Users.autoUpdateUsers();
        Channels.autoUpdateChannels();
        this.registerCommands();

        Reply({
            channel:REPORT_CHANNEL,
            text:'BOT BOT BOT BACK BACK BACK ON ON LINE'
        });
    }

    registerCommands() {
        this.commadsToRegister.forEach((command: CommandInterface) => {
            this.registerCommand(command);
        })
    }

    // TODO: How do you assign a type here
    registerCommand(command: any) {
        const instantiatedCommand = new command(this.app);
        const { registeredCommands } = this;

        const { commands } = instantiatedCommand;

        for (let commandKey of commands) {
            const isAlreadyRegistered = !!registeredCommands[commandKey];
            if (!isAlreadyRegistered) registeredCommands[commandKey] = instantiatedCommand;
        }
    }

    parseHook(req: Request, res: Response) {

        const body = req.body as SlackMessage;
        const { registeredCommands } = this;

        Logger.log('parseHook', JSON.stringify(body));

        // Slack sends a token to prove its authenticity, if it doesn't match, reject
        if (!body.token || body.token !== VERIFICATION_TOKEN) return res.status(401).send();

        // Sometimes slack sends a challenge to prove we own the URL
        if (body.challenge) return res.status(200).send(body.challenge);

        // Everything else from here is kosher
        res.status(200).send();

        if (body.event && body.event.text) {
            const { event } = body;

            if (event.username === BOT_NAME) return;

            let trigger = event.text.split(' ',1)[0];
            if (trigger[0] === TRIGGER_PREFIX) {
                const triggerCommand = registeredCommands[trigger.substring(1)];
                if (triggerCommand) return triggerCommand.reply(body);
            }

            // Catch All Triggers
            this.registeredCommands.trigger.scan(body);

        }

    }

}
