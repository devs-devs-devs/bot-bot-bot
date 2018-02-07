import * as fs from 'fs-extra';
import * as path from 'path';

const markov = require('markov');

const markovFile = path.resolve(__dirname, '../../markov.txt');
console.log('MARKOVFILE', markovFile);
fs.ensureFileSync(markovFile);

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
        console.log('Writing to file', str);
        fs.appendFileSync(markovFile, str.trim()+"\n");
    }

}

export default new Markov();
