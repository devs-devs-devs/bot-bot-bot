import { Application } from 'express';

import { HelloWorld } from './hello-world';

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

            if (body.hasOwnProperty('challenge')) {
                return res.status(200).send(body.challenge);
            }

            console.log(body);

        });

    }

    registerCommand(command: any) {
        let instantiatedCommand = new command();
        this.registeredCommands[instantiatedCommand.name] = instantiatedCommand;
    }

}
