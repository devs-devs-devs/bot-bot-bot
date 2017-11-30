import agent = require('superagent');

const { SLACK_TOKEN, BOT_NAME, ICON_EMOJI } = process.env;

export function Reply(req: any, res: any, fullText: string, json: object) {

    res.status(200).send();

    const { event } = req.body;

    const defaultMessage = {
        channel:event.channel,
        text:'',
        as_user:false,
        username:BOT_NAME,
        icon_emoji:ICON_EMOJI
    };

    const payload = {
        ...defaultMessage,
        ...json,
        token: SLACK_TOKEN
    };

    agent
        .get('https://slack.com/api/chat.postMessage')
        .query(payload)
        .end((err,res) => {
            if (err) console.log(err)
        });

}
