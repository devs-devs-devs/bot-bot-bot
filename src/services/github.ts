import { Application, Request, Response } from 'express';
import Reply from './reply';
import childProcess = require('child_process');

const { GITHUB_SECRET } = process.env;

class Github {

    constructor(app: Application) {

        app.get('/github', this.parsePayload.bind(this));

        Reply(null, null, '', {
            channel:'cp',
            text:'GITHUB THING LOADED'
        });

    }

    parsePayload(req: Request, res: Response) {

        res.send('ok');

        Reply(null, null, '', {
            channel:'cp',
            text:'GITHUB THING HOOKED'
        });

    }


}


// git pull && npm run build && cp .env dist/ && forever restartall
