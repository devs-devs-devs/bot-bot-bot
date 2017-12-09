import { Application, Request, Response } from 'express';
import Reply from './reply';
import childProcess = require('child_process');
import crypto = require('crypto');

const { GITHUB_SECRET } = process.env;

export default class Github {

    constructor(app: Application) {

        app.get('/github', this.parsePayload.bind(this));

        Reply(null, null, '', {
            channel:'cp',
            text:'GITHUB THING LOADED'
        });

    }

    parsePayload(req: Request, res: Response) {

        const payload = JSON.stringify(req.body);
        const signature = req.get('HTTP_X_HUB_SIGNATURE');
        const computedSignature = `sha1=${crypto.createHmac("sha1", GITHUB_SECRET).update(payload).digest("hex")}`;

        const secureHook = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computedSignature));

        if (!secureHook) return res.status(401).send('Unsecure');

        Reply(null, null, '', {
            channel:'cp',
            text:'GITHUB THING HOOKED'
        });

    }


}

// git pull && npm run build && cp .env dist/ && forever restartall
