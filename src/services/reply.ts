import Settings from './settings';
import Logger from './logger';
import agent = require('superagent');
import { SlackEvent } from '../interfaces/slack';
import chalk from 'chalk';

export default function Reply(json: any, event: SlackEvent) {

    const serviceName = chalk.yellow('Reply:');

    let channel;

    if (event.channel) channel = event.channel;

    const payload = {
        ...Settings.defaultMessage,
        channel,
        ...json
    };

    agent
        .get('https://slack.com/api/chat.postMessage')
        .query(payload)
        .end((err,res) => {
            if (err) {
                Logger.error(serviceName, 'error', err);
            } else {
                const text = payload.text || '';
                Logger.log(serviceName, 'Responded with', text.toString ? text.toString() : text);
            }
        });

}
