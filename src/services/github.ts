import { Application, Request, Response } from 'express';
import Reply from './reply';
import childProcess = require('child_process');
import crypto = require('crypto');

let GITHUB_SECRET = process.env.GITHUB_SECRET || '';

export default class Github {

    constructor(app: Application) {

        app.post('/github', this.parsePayload.bind(this));

        Reply(null, null, '', {
            channel:'cp',
            text:'BOT BOT BOT Back Online :nerd_face:'
        });

    }

    parsePayload(req: Request, res: Response) {

        const payload = JSON.stringify(req.body);
        const signature = req.get('x-hub-signature') || '';
        const computedSignature = `sha1=${crypto.createHmac("sha1", GITHUB_SECRET).update(payload).digest("hex")}`;

        const secureHook = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computedSignature));

        if (!secureHook) return res.status(401).send('Unsecure');

        res.status(200).send('OK');

        Reply(null, null, '', {
            channel:'cp',
            text:':wheelchair: Uh oh, reticulating splines :robot_face:'
        });

        [
            '/usr/bin/git pull',
            '/usr/local/bin/npm run build',
            'cp .env dist/',
            '/usr/local/bin/forever restartall'
        ].forEach(cmd => {
            childProcess.execSync(`cd /home/slack/bot-bot-bot && ${cmd}`);
        });

    }


}

// git pull && npm run build && cp .env dist/ && forever restartall

