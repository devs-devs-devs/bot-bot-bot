"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var agent = require("superagent");
var settings_1 = require("./settings");
function Reply(req, res, fullText, json) {
    res.status(200).send();
    var event = req.body.event;
    var payload = __assign({}, settings_1.default.defaultMessage, { channel: event.channel }, json);
    agent
        .get('https://slack.com/api/chat.postMessage')
        .query(payload)
        .end(function (err, res) {
        if (err)
            console.log(err);
    });
}
exports.default = Reply;
