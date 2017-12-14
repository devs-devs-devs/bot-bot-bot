import agent = require('superagent');
import Data from './data';
import Settings from './settings';
import Logger from './logger';
import chalk from 'chalk';
import Reply from './reply';

const { SLACK_TOKEN } = process.env;

class Channels {

    public channels: any = [];
    private serviceName: any = chalk.yellow('Channels:');

    constructor() {
        Logger.log(this.serviceName, 'service loaded');
    }

    async autoUpdateChannels() {

        const updateChannelsInterval = await Settings.get('updateChannelsInterval');

        const payload = {
            token: SLACK_TOKEN
        };

        agent
            .get('https://slack.com/api/channels.list')
            .query(payload)
            .end((err,res) => {
                //console.log(res.body);
                if (err) {
                    Logger.error(this.serviceName, 'error', err);
                } else if (res.body.channels) {
                    this.channels = res.body.channels;
                    Logger.log(this.serviceName, this.channels.length, 'channels retrieved');
                    this.channels.forEach((channel:any) => {
                        this.join(channel.name);
                    })
                }

                setTimeout(() => {
                    this.autoUpdateChannels()
                }, updateChannelsInterval.value)
                Logger.log(this.serviceName, 'next refresh in', updateChannelsInterval.value / 1000, 'seconds');

            });

    }

    join(channelName: string) {

        Logger.log(this.serviceName, 'joining channel', channelName);

        const payload = {
            name: channelName,
            token: SLACK_TOKEN
        };

        agent
            .get('https://slack.com/api/channels.join')
            .query(payload)
            .end((err,res) => {
                if (err) {
                    Logger.error(this.serviceName, 'error', err);
                } else if (res.body.channel && !res.body.already_in_channel) {
                    Reply({
                        text:'Hello, losers.',
                        channel:res.body.channel.id
                    });
                    Logger.log(this.serviceName, res.body.channel.name, 'joined');
                } else {
                    //console.log(res.body);
                }
            });

    }

    id(id: string) {
        const member = (this.channels||[]).filter((member: any) => member.id === id);
        return member.length ? member[0] : {
            name:id,
            id
        };
    }

}

export default new Channels();

