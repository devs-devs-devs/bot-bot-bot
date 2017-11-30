import { Application } from 'express';

import { Reply } from '../reply';

import { HelloWorld } from './hello-world';

const { VERIFICATION_TOKEN, TRIGGER_PREFIX } = process.env;

export default class BotBotBot {

    private registeredCommands: any = {};

    constructor(app: Application) {

        [
            HelloWorld
        ].forEach(command => {
            this.registerCommand(command);
        });

        app.all('/', (req, res) => {
            const { body } = req;

            console.log(body);

            if (!body.hasOwnProperty('token') && body.token !== VERIFICATION_TOKEN) return res.status(401).send();

            if (body.hasOwnProperty('challenge')) {
                return res.status(200).send(body.challenge);
            } else if (body.hasOwnProperty('event') && body.event.hasOwnProperty('text')) {

                console.log(new Date().toISOString(), body.event.text);

                const fullText = body.event.text;

                let [ trigger, params ] = fullText.split(' ', Math.max(fullText.indexOf(' '), fullText.length));

                if (trigger[0] !== TRIGGER_PREFIX) return res.status(200).send();

                const triggerReply = this.registeredCommands[trigger.substring((1))];

                if (triggerReply) return Reply(req, res, fullText, triggerReply.reply(params, body.event));

            }

            return res.status(404).send('Command not found');

        });

    }

    registerCommand(command: any) {
        let instantiatedCommand = new command();
        this.registeredCommands[instantiatedCommand.command] = instantiatedCommand;
    }

}
