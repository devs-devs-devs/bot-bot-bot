"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var settings_1 = require("./settings");
var Data = /** @class */ (function () {
    function Data() {
        var dataFilePath = settings_1.default.dataFilePath, dataSavePath = settings_1.default.dataSavePath;
        if (!fs.existsSync(dataSavePath))
            fs.mkdirSync(dataSavePath);
        if (!fs.existsSync(dataFilePath)) {
            this.data = {};
            this.save();
        }
        this.read();
    }
    Data.prototype.read = function () {
        var data = fs.readFileSync(settings_1.default.dataFilePath).toString();
        console.log('DATA', data);
        this.data = JSON.parse(data);
    };
    Data.prototype.startAutoSave = function () {
        var _this = this;
        console.log('Saving...');
        fs.writeFile(settings_1.default.dataFilePath, JSON.stringify(this.data, null, 4), function () {
            console.log('SAVED');
        });
        setTimeout(function () {
            _this.startAutoSave();
        }, settings_1.default.saveInterval);
    };
    Data.prototype.save = function () {
        fs.writeFileSync(settings_1.default.dataFilePath, JSON.stringify(this.data, null, 4));
    };
    Data.prototype.namespace = function (namespace) {
        if (!this.data[namespace]) {
            this.data[namespace] = (_a = {},
                _a[namespace] = {
                    created: new Date()
                },
                _a);
        }
        return this.data[namespace];
        var _a;
    };
    return Data;
}());
exports.default = new Data();
