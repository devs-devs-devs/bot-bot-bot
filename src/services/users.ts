import agent = require('superagent');

const { SLACK_TOKEN } = process.env;

class Users {

    private users: any = [];

    constructor() {

        setTimeout(() => this.updateUsers(), 5000);

    }

    updateUsers() {

        const payload = {
            token: SLACK_TOKEN
        };

        agent
            .get('https://slack.com/api/users.list')
            .query(payload)
            .end((err,res) => {
                if (err) console.log(err)
                console.log(res.body);
            });

    }

}

export default new Users();
