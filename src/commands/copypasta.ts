import Data from '../services/data';

export class Copypasta {

    private commands: object = ['copypasta'];

    private copypastas: any;

    constructor() {
        console.log(this.commands, 'loaded');

        const data = Data.namespace('copypasta');
        if (!data.copypastas) data.copypastas = [];

        this.copypastas = data.copypastas;
    }

    reply(params: string, event: object) {

        const action = params.split(' ', 1)[0];

        const actions = ['add', 'delete'];

        console.log(event);

        // if (ations.indexOf(action) >= 0) {
        //     this.copypastas.push(params.substring(params.indexOf(' ')).trim());
        //     return {
        //         text:'Added: '
        //     }
        // }

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
