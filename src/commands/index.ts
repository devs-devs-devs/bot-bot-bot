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
            } else if (body.hasOwnProperty('event') && body.event.hasOwnProperty('text')) {

                console.log(body);

                const fullText = body.event.text;

                const [ botTrigger, command ] = fullText.split(' ', 2);
                const params = fullText.substring(Math.max(fullText.indexOf(' ', 3), fullText.length));

                if (botTrigger !== '!b') return res.status(200).send();

                if (this.registeredCommands[command]) {
                    console.log(new Date().toISOString(), fullText);
                    return res.status(200).send(this.registeredCommands[command].reply(params) || {});
                }

            }

            return res.status(404).send('Command not found');

        });

    }

    registerCommand(command: any) {
        let instantiatedCommand = new command();
        this.registeredCommands[instantiatedCommand.trigger] = instantiatedCommand;
    }

}
