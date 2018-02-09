import * as fs from 'fs-extra';
import * as path from 'path';
import Logger from './logger';

const markov = require('markov');

const markovFile = path.resolve(__dirname, '../../markov.txt');
console.log('MARKOVFILE', markovFile);
fs.ensureFileSync(markovFile);

let m: any;
let s: any;

function reSeedMarkov() {
    m = new markov(2);
    s = fs.createReadStream(markovFile);
    m.seed(s, function() {});
}

setInterval(() => {
    reSeedMarkov();
}, 3600 * 1000);

reSeedMarkov();

class Markov {

    public filePath: string = markovFile;

    constructor() {
        fs.ensureFileSync(this.filePath);
    }

    reply(inputText: string = 'wanker') {
        return Promise.resolve(m.respond(inputText).join(' ').trim());
    }

    write(str: string = '') {
        Logger.log('Writing to file', str);
        fs.appendFileSync(this.filePath, str.trim() + '\n');
    }

}

export default new Markov();
