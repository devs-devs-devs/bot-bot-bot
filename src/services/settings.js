"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var _a = process.env, SLACK_TOKEN = _a.SLACK_TOKEN, BOT_NAME = _a.BOT_NAME, ICON_EMOJI = _a.ICON_EMOJI;
var Settings = /** @class */ (function () {
    function Settings() {
        this.defaultMessage = {
            text: '',
            as_user: false,
            username: BOT_NAME,
            icon_emoji: ICON_EMOJI,
            token: SLACK_TOKEN
        };
        this.saveInterval = (10 * 1000);
        this.usersInterval = (5 * 60 * 1000);
        this.dataSavePath = path.resolve(process.cwd(), '../');
        this.dataFilePath = this.dataSavePath + "/bot-data.json";
    }
    return Settings;
}());
exports.default = new Settings();
