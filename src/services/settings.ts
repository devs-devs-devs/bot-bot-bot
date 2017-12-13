import Data from './data';
import Logger from './logger';
import chalk from 'chalk';

const { BOT_NAME, ICON_EMOJI, SLACK_TOKEN } = process.env;

class Settings {

    private serviceName: any = chalk.yellow('Settings:');

    public defaultMessage: any = {
        text:'',
        as_user:false,
        username:BOT_NAME,
        icon_emoji:ICON_EMOJI,
        token:SLACK_TOKEN
    };

    constructor() {
        Logger.log(this.serviceName, 'service loaded');
    }

    async get(setting: string) {
        const settings = await Data.pool.query('SELECT * FROM `settings` WHERE `key` = ?', [setting]);
        const row = (settings[0] as any)[0];
        let { value, title } = row;
        value = JSON.parse(value.toString());
        title = title.toString();
        return {
            ...row,
            value,
            title
        };
    }

    async set(setting: string, value: any, title: string) {
        return await Data.pool.query('INSERT INTO `settings` (key, value, title) VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE `value` = ?', [setting, value, title, value]);
    }

}

export default new Settings();
