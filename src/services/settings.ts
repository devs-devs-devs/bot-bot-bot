import path = require('path');

const { SLACK_TOKEN, BOT_NAME, ICON_EMOJI } = process.env;

class Settings {

    public defaultMessage = {
        text:'',
        as_user:false,
        username:BOT_NAME,
        icon_emoji:ICON_EMOJI,
        token:SLACK_TOKEN
    };

    public saveInterval = (10 * 1000);

    public dataSavePath: string = path.resolve(process.cwd(), '../');
    public dataFilePath: string = `${this.dataSavePath}/bot-data.json`;

    constructor() {

    }

}

export default new Settings();
