"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("../services/data");
var HelloWorld = /** @class */ (function () {
    function HelloWorld() {
        this.commands = ['hello-world'];
        console.log(this.commands, 'loaded');
        this.data = data_1.default.namespace('hello-world');
    }
    HelloWorld.prototype.reply = function (params, event) {
        return {
            text: 'Hello, world'
        };
    };
    return HelloWorld;
}());
exports.HelloWorld = HelloWorld;
