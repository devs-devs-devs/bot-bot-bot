import agent = require('superagent');

import Settings from './settings';

export default function Reply(req: any, res: any, fullText: string, json: any) {

    let channel;

    if (req && res) {
        res.status(200).send();
        channel = req.body.event.channel;
    }

    const payload = {
        ...Settings.defaultMessage,
        channel,
        ...json
    };

    agent
        .get('https://slack.com/api/chat.postMessage')
        .query(payload)
        .end((err,res) => {
            if (err) console.log(err)
        });

}
