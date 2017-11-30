import fs = require('fs');
import path = require('path');

export class Copypasta {

    private savePath: string = path.resolve(process.cwd(), '../bot-data');
    private filePath: string = `${this.savePath}/copypasta.json`;

    private commands: object = ['cp', 'copypasta'];

    private copypastas: any;

    constructor() {
        console.log(this.commands, 'loaded');
        if (!fs.existsSync(this.savePath)) fs.mkdirSync(this.savePath);
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([]))
        }
        this.copypastas = JSON.parse(fs.readFileSync(this.filePath).toString());
    }

    reply(params: string, event: object) {

        const action = params.split(' ', 1)[0];

        const actions = ['add'];

        if (actions.indexOf(action) >= 0) {
            this.copypastas.push(params.substring(params.indexOf(' ')).trim());
            this.save();
            return {
                text:'Added!'
            };
        } else {
            // find random copypasta
            if (!this.copypastas.length) {
                return {
                    text:'No copypastas'
                };
            }

            return {
                text: this.copypastas[Math.floor(Math.random() * this.copypastas.length)]
            }
        }

    }

    save() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.copypastas));
    }

}
