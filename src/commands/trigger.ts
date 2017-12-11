import Data from '../services/data';
import Reply from '../services/reply';

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
    private data: any;

    constructor() {
        console.log(this.commands, 'loaded');
        const data = Data.namespace('trigger');
        if (!data.hasOwnProperty('triggers')) data.triggers = {};
        this.data = data.triggers;
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

        if (!this.data[trigger]) this.data[trigger] = [];

        this.data[trigger].push(phrase);

        return {
            text:`Added \`${phrase}\` as a response to \`${trigger}\``
        }

    }

    deleteAction() {
        return {
            text:'Not yet implemeneted'
        }
    }

    scan(event: any) {

        console.log('Scanning', event.text);

        const text = event.text||'';
        const triggers = shuffle(text.split(' '));

        while (true) {

            const trigger = triggers.pop();

            if (trigger) {

                const response = shuffle(this.data[trigger]||[])[0];

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
