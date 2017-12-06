import Data from '../services/data';
import Users from '../services/users';
import { Application, Response, Request } from 'express';

function shuffle(array: any) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export class Copypasta {

    private commands: object = ['copypasta'];

    private copypastas: any;

    constructor(app: Application) {
        console.log(this.commands, 'loaded');

        const data = Data.namespace('copypasta');
        if (!data.copypastas) data.copypastas = {};

        this.copypastas = data.copypastas;

        app.get('/copypasta', this.serveCopypasta.bind(this));
    }

    serveCopypasta(req: Request, res: Response) {
        res.send(this.copypastas);
    }

    reply(params: string, event: any) {

        const action = params.split(' ', 1)[0];

        const actions = ['add', 'delete'];

        if (actions.indexOf(action) !== -1) {

            if (action === 'add') return this.addAction(params.substring(params.indexOf(' ')).trim(), event);

        } else {

            const keys = Object.keys(this.copypastas);
            if (!keys.length) return {
                text:'No copypastas'
            };

            let key = shuffle(keys)[0];

            return {
                text: this.copypastas[key].copypasta
            }

        }

    }

    addAction(copypasta: string, event: any) {

        if (!copypasta) return {
            text:'NO COPYPASTA M8 WTF'
        };

        const key = Object.keys(this.copypastas).length;

        this.copypastas[key] = { ...event, copypasta };

        return {
            text:`Copy pasta \`${key}\` added by <@${Users.id(event.user).name}>`
        }
    }

}


// import fs = require('fs');
// import path = require('path');
//
// export class Copypasta {
//

//
//     reply(params: string, event: object) {
//
//         const action = params.split(' ', 1)[0];
//
//         const actions = ['add'];
//
//         if (actions.indexOf(action) >= 0) {
//             this.copypastas.push(params.substring(params.indexOf(' ')).trim());
//             this.save();
//             return {
//                 text:'Added!'
//             };
//         } else {
//             // find random copypasta
//             if (!this.copypastas.length) {
//                 return {
//                     text:'No copypastas'
//                 };
//             }
//
//             return {
//                 text: this.copypastas[Math.floor(Math.random() * this.copypastas.length)]
//             }
//         }
//
//     }
//
//     save() {
//         fs.writeFileSync(this.filePath, JSON.stringify(this.copypastas));
//     }
//
// }
