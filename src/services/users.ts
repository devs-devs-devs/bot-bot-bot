import agent = require('superagent');
import Data from './data';
import Settings from './settings';
import Logger from './logger';
import chalk from 'chalk';

const { SLACK_TOKEN } = process.env;

class Users {

    public members: any = [];
    private serviceName: any = chalk.yellow('Users:');

    constructor() {
        Logger.log(this.serviceName, 'service loaded');
    }

    async autoUpdateUsers() {

        const updateUsersInterval = await Settings.get('updateUsersInterval');

        const payload = {
            token: SLACK_TOKEN
        };

        agent
            .get('https://slack.com/api/users.list')
            .query(payload)
            .end((err,res) => {
                if (err) {
                    Logger.error(this.serviceName, 'error', err);
                } else if (res.body.members) {
                    this.members = res.body.members;
                    Logger.log(this.serviceName, this.members.length, 'members retrieved');
                }

                setTimeout(() => {
                    this.autoUpdateUsers()
                }, updateUsersInterval.value)
                Logger.log(this.serviceName, 'next refresh in', updateUsersInterval.value / 1000, 'seconds');

            });

    }

    id(id: string) {
        const member = (this.members||[]).filter((member: any) => member.id === id);
        return member.length ? member[0] : {
            name:id,
            id
        };
    }

}

export default new Users();
