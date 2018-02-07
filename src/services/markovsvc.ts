import * as fs from 'fs-extra';
import * as path from 'path';

const markov = require('markov');

const markovFile = path.resolve(__dirname, '../../markov.txt');

class Markov {

    constructor() {
        fs.ensureFileSync(markovFile);
    }

    reply(inputText: string) {
        return new Promise((resolve,reject) => {
            const m = markov(1);
            const s = fs.createReadStream(markovFile);
            m.seed(s, () => {
                const reply = m.respond(inputText).join(' ');
                resolve(reply);
            })
        });
    }

    write(str: string = '') {
        fs.appendFileSync(markovFile, str.trim()+"\n");
    }

}

export default new Markov();
