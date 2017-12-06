import agent = require('superagent');

import Settings from './settings';

export default function Reply(req: any, res: any, fullText: string, json: object) {

    res.status(200).send();

    const { event } = req.body;

    const payload = {
        ...Settings.defaultMessage,
        channel:event.channel,
        ...json
    };

    agent
        .get('https://slack.com/api/chat.postMessage')
        .query(payload)
        .end((err,res) => {
            if (err) console.log(err)
        });

}
