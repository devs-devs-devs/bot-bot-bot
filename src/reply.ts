import agent = require('superagent');

const { SLACK_TOKEN } = process.env;

export function Reply(req: any, res: any, fullText: string, json: object) {

    res.status(200).send();

    const { event } = req.body;

    const defaultMessage = {
        channel:event.channel,
        text:String(+new Date)+' yes m8',
        as_user:'bot_bot_bot'
    };

    const payload = {
        ...defaultMessage,
        ...json,
        token: SLACK_TOKEN
    };

    agent
        .get('https://slack.com/api/chat.postMessage')
        .query(payload)
        .end((err,res) => console.log());

}
