import { Request, Response, Application } from 'express';
import crypto = require('crypto');
import childProcess = require('child_process');
import Logger from './logger';
import chalk from 'chalk';

const GITHUB_SECRET = process.env.GITHUB_SECRET || '';

export default class Github {

    private serviceName: any = chalk.yellow('Github:');

    constructor(app: Application) {
        Logger.log(this.serviceName, 'hooks online');
        app.post('/github', this.parsePayload.bind(this));
    }

    parsePayload(req: Request, res: Response) {

        const payload = JSON.stringify(req.body);
        const signature = req.get('x-hub-signature') || '';
        const computedSignature = `sha1=${crypto.createHmac("sha1", GITHUB_SECRET).update(payload).digest("hex")}`;

        const secureHook = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computedSignature));

        if (!secureHook) return res.status(401).send('Unsecure');

        res.status(200).send('OK');

        setTimeout(() => {
            [
                '/usr/bin/git pull',
                '/usr/local/bin/npm run build',
                'cp .env dist/',
                '/usr/local/bin/forever restartall'
            ].forEach(cmd => {
                childProcess.execSync(`cd /home/slack/bot-bot-bot && ${cmd}`);
            });
        }, 5000);
    }
}
