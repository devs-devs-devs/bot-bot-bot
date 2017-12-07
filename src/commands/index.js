"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("../services/data");
var reply_1 = require("../services/reply");
// import Settings from '../services/settings';
var users_1 = require("../services/users");
var hello_world_1 = require("./hello-world");
var copypasta_1 = require("./copypasta");
var _a = process.env, VERIFICATION_TOKEN = _a.VERIFICATION_TOKEN, TRIGGER_PREFIX = _a.TRIGGER_PREFIX, BOT_NAME = _a.BOT_NAME;
var BotBotBot = /** @class */ (function () {
    function BotBotBot(app) {
        var _this = this;
        this.registeredCommands = {};
        [
            hello_world_1.HelloWorld,
            copypasta_1.Copypasta
        ].forEach(function (command) {
            _this.registerCommand(command, app);
        });
        data_1.default.startAutoSave();
        users_1.default.autoUpdateUsers();
        app.all('/', this.parseHook.bind(this));
    }
    BotBotBot.prototype.registerCommand = function (command, app) {
        var instantiatedCommand = new command(app);
        var registeredCommands = this.registeredCommands;
        var commands = instantiatedCommand.commands;
        for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
            var commandKey = commands_1[_i];
            var isAlreadyRegistered = !!registeredCommands[commandKey];
            if (!isAlreadyRegistered)
                registeredCommands[commandKey] = instantiatedCommand;
        }
    };
    BotBotBot.prototype.parseHook = function (req, res) {
        var body = req.body;
        var registeredCommands = this.registeredCommands;
        if (!body.hasOwnProperty('token') && body.token !== VERIFICATION_TOKEN)
            return res.status(401).send();
        if (body.hasOwnProperty('challenge'))
            return res.status(200).send(body.challenge);
        if (body.hasOwnProperty('event') && body.event.hasOwnProperty('text')) {
            if (BOT_NAME === body.event.username)
                return res.status(200).send();
            console.log(new Date().toISOString(), body.event.text);
            var fullText = body.event.text;
            var trigger = fullText.split(' ', 1)[0];
            var params = fullText.substring(fullText.indexOf(' ')).trim();
            if (trigger[0] !== TRIGGER_PREFIX)
                return res.status(200).send();
            var triggerReply = registeredCommands[trigger.substring((1))];
            if (triggerReply)
                return reply_1.default(req, res, fullText, triggerReply.reply(params, body.event));
        }
        return res.status(404).send('Command not found');
    };
    return BotBotBot;
}());
exports.default = BotBotBot;
