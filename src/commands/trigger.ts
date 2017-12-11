import Data from '../services/data';
import Reply from '../services/reply';
import { Request, Response } from 'express';

function shuffle(a: any) {
    a = a || [];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export class Trigger {

    private commands: object = ['t','trigger'];
    public triggers: any = {};

    constructor() {
        console.log(this.commands, 'loaded');
        const data = Data.namespace('trigger');
        if (!data.hasOwnProperty('triggers')) data.triggers = {};
        this.triggers = data.triggers;
        this.triggers['bot-bot-bot'] = [
            'fuck off you mug',
            'are you mugging me off in front of my friends?',
            'oi lads who remembers that time Lil Funnel archived general, twat'
        ]
    }

    reply(params: string, event: object) {

        const action = params.split(' ', 1)[0];

        const actions = ['add', 'delete'];

        if (actions.indexOf(action) !== -1) {
            if (action === 'add') return this.addAction(params.substring(params.indexOf(' ')).trim(), event);
            if (action === 'delete') return this.deleteAction();
        }

    }

    addAction(response: string, event: any) {

        if (!response) return {
            text:'NO RESPONSE M8 WTF'
        };

        const trigger = response.substring(0, response.indexOf(' ')).trim();
        const phrase = response.substring(response.indexOf(' ')).trim();

        if (!trigger || !phrase)return {
            text:'NO TRIGGER OR PHRASE M8 WTF'
        }

        if (!this.triggers[trigger]) this.triggers[trigger] = [];

        this.triggers[trigger].push(phrase);

        return {
            text:`Added \`${phrase}\` as a response to \`${trigger}\``
        }

    }

    deleteAction() {
        return {
            text:'Not yet implemeneted'
        }
    }

    scan(req: Request, res: Response, event: any) {

        const dataTriggers = Data.namespace('trigger').triggers;

        console.log('Scanning', event.text);

        const text = event.text||'';
        const triggers = shuffle(text.split(' '));

        while (true) {

            const trigger = triggers.pop();

            console.log(this);

            if (trigger && dataTriggers[trigger] && dataTriggers[trigger].length) {

                const responses = this.triggers[trigger];

                const response = shuffle(responses)[0];

                if (response) {
                    Reply(null, null, '', {
                        channel:event.channel,
                        text:response
                    });
                    break;
                }

            }

        }



    }

}
