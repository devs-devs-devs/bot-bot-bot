import * as fs from 'fs-extra';
import * as path from 'path';
import Logger from './logger';

const jsmegahal = require('jsmegahal');

const markovFile = path.resolve(__dirname, '../../markov.txt');
console.log('MARKOVFILE', markovFile);
fs.ensureFileSync(markovFile);

function parseLine(str: string) {
    const lines = fs.readFileSync(markovFile).toString().split('\n');
    if (str.length > 100) return false;
    if (str === '') return false;
    if (lines.indexOf(str) !== -1) return false;
    if (str[0] === '!') return false;
    return str;
}

let megahal: any = new jsmegahal(4);
megahal.addMass(fs.readFileSync(markovFile).toString());

class Markov {

    public filePath: string = markovFile;

    constructor() {
        fs.ensureFileSync(this.filePath);
    }

    reply(str: string) {
        return Promise.resolve(megahal.getReplyFromSentence(str));
    }

    write(str: string = '') {
        const canWrite = parseLine(str);
        if (canWrite) {
            Logger.log('Writing to file', str);
            fs.appendFileSync(this.filePath, str.trim() + '\n');
            megahal.add(str.trim());
        }
    }

}

export default new Markov();
