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
var data_1 = require("../services/data");
var users_1 = require("../services/users");
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
var Copypasta = /** @class */ (function () {
    function Copypasta(app) {
        this.commands = ['copypasta'];
        console.log(this.commands, 'loaded');
        var data = data_1.default.namespace('copypasta');
        if (!data.copypastas)
            data.copypastas = {};
        this.copypastas = data.copypastas;
        app.get('/copypasta', this.serveCopypasta.bind(this));
    }
    Copypasta.prototype.serveCopypasta = function (req, res) {
        res.send(this.copypastas);
    };
    Copypasta.prototype.reply = function (params, event) {
        var action = params.split(' ', 1)[0];
        var actions = ['add', 'delete'];
        if (actions.indexOf(action) !== -1) {
            if (action === 'add')
                return this.addAction(params.substring(params.indexOf(' ')).trim(), event);
        }
        else {
            var keys = Object.keys(this.copypastas);
            if (!keys.length)
                return {
                    text: 'No copypastas'
                };
            var key = shuffle(keys)[0];
            return {
                text: this.copypastas[key].copypasta
            };
        }
    };
    Copypasta.prototype.addAction = function (copypasta, event) {
        if (!copypasta)
            return {
                text: 'NO COPYPASTA M8 WTF'
            };
        var key = Object.keys(this.copypastas).length;
        this.copypastas[key] = __assign({}, event, { copypasta: copypasta });
        return {
            text: "Copy pasta `" + key + "` added by <@" + users_1.default.id(event.user).name + ">"
        };
    };
    return Copypasta;
}());
exports.Copypasta = Copypasta;
// import fs = require('fs');
// import path = require('path');
//
// export class Copypasta {
//
//
//     reply(params: string, event: object) {
//
//         const action = params.split(' ', 1)[0];
//
//         const actions = ['add'];
//
//         if (actions.indexOf(action) >= 0) {
//             this.copypastas.push(params.substring(params.indexOf(' ')).trim());
//             this.save();
//             return {
//                 text:'Added!'
//             };
//         } else {
//             // find random copypasta
//             if (!this.copypastas.length) {
//                 return {
//                     text:'No copypastas'
//                 };
//             }
//
//             return {
//                 text: this.copypastas[Math.floor(Math.random() * this.copypastas.length)]
//             }
//         }
//
//     }
//
//     save() {
//         fs.writeFileSync(this.filePath, JSON.stringify(this.copypastas));
//     }
//
// }
