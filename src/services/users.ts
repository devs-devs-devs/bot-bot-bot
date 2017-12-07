import agent = require('superagent');
import Data from './data';
import Settings from './settings';

const { SLACK_TOKEN } = process.env;

class Users {

    public members: any = [];

    // Example
    // { id: 'USLACKBOT',
    //     team_id: 'T5T1MHSQL',
    //     name: 'slackbot',
    //     deleted: false,
    //     color: '757575',
    //     real_name: 'slackbot',
    //     tz: null,
    //     tz_label: 'Pacific Standard Time',
    //     tz_offset: -28800,
    //     profile:
    //         { first_name: 'slackbot',
    //             last_name: '',
    //             image_24: 'https://a.slack-edge.com/0180/img/slackbot_24.png',
    //             image_32: 'https://a.slack-edge.com/41b0a/img/plugins/slackbot/service_32.png',
    //             image_48: 'https://a.slack-edge.com/41b0a/img/plugins/slackbot/service_48.png',
    //             image_72: 'https://a.slack-edge.com/0180/img/slackbot_72.png',
    //             image_192: 'https://a.slack-edge.com/66f9/img/slackbot_192.png',
    //             image_512: 'https://a.slack-edge.com/1801/img/slackbot_512.png',
    //             avatar_hash: 'sv1444671949',
    //             always_active: true,
    //             display_name: 'slackbot',
    //             real_name: 'slackbot',
    //             real_name_normalized: 'slackbot',
    //             display_name_normalized: 'slackbot',
    //             fields: null,
    //             team: 'T5T1MHSQL' },
    //     is_admin: false,
    //     is_owner: false,
    //     is_primary_owner: false,
    //     is_restricted: false,
    //     is_ultra_restricted: false,
    //     is_bot: false,
    //     updated: 0,
    //     is_app_user: false }

    constructor() {

    }

    autoUpdateUsers() {

        const payload = {
            token: SLACK_TOKEN
        };

        agent
            .get('https://slack.com/api/users.list')
            .query(payload)
            .end((err,res) => {
                if (err) return console.log(err);

                if (res.body.members) this.members = res.body.members;

                setInterval(() => {
                    this.autoUpdateUsers()
                }, Settings.usersInterval);

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
