import * as fs from 'fs-extra';
import * as path from 'path';
import Logger from './logger';

const markov = require('markov');
const Text = require('markov-chains-text').default;

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

// let m: any;
// let s: any;
//
// function reSeedMarkov() {
//     m = new markov(5);
//     s = fs.createReadStream(markovFile);
//     m.seed(s, function() {});
// }
//
//
//
// setInterval(() => {
//     reSeedMarkov();
// }, 3600 * 1000);

//reSeedMarkov();

let markovSeed: any;

function seedMarkov() {
    markovSeed = new Text(fs.readFileSync(markovFile));
}

setInterval(() => {
    seedMarkov();
}, 3600 * 1000);
seedMarkov();

class Markov {

    public filePath: string = markovFile;

    constructor() {
        fs.ensureFileSync(this.filePath);
    }

    reply() {
        return Promise.resolve(markovSeed.makeSentence());
    }

    write(str: string = '') {
        const canWrite = parseLine(str);
        if (canWrite) {
            Logger.log('Writing to file', str);
            fs.appendFileSync(this.filePath, str.trim() + '\n');
        }
    }

}

export default new Markov();
