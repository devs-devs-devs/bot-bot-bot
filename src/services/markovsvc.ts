import * as fs from 'fs-extra';
import * as path from 'path';
import Logger from './logger';

const markov = require('markov');

const markovFile = path.resolve(__dirname, '../../markov.txt');
console.log('MARKOVFILE', markovFile);
fs.ensureFileSync(markovFile);

class Markov {

    constructor() {
        fs.ensureFileSync(markovFile);
    }

    reply(inputText: string = 'wanker') {
        return new Promise((resolve,reject) => {
            const m = markov(2);
            const s = fs.createReadStream(markovFile);
            m.seed(s, function () {
                const reply = m.respond(inputText).join(' ');
                resolve(reply);
            });
        });
    }

    write(str: string = '') {
        Logger.log('Writing to file', str);
        fs.appendFileSync(markovFile, str.trim()+"\n");
    }

}

export default new Markov();
