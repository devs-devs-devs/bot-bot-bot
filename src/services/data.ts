import fs = require('fs');

import Settings from './settings';

class Data {

    private data: any;

    constructor() {

        const { dataFilePath, dataSavePath } = Settings;

        if (!fs.existsSync(dataSavePath)) fs.mkdirSync(dataSavePath);
        if (!fs.existsSync(dataFilePath)) {
            this.data = {};
            this.save();
        }
        this.read();
    }

    read() {
        const data = fs.readFileSync(Settings.dataFilePath).toString();
        console.log('DATA', data);
        this.data = JSON.parse(data);
    }

    startAutoSave() {
        console.log('Saving...');
        fs.writeFile(Settings.dataFilePath, JSON.stringify(this.data, null, 4), () => {
            console.log('SAVED');
        });
        setTimeout(() => {
            this.startAutoSave();
        }, Settings.saveInterval)
    }

    save() {
        fs.writeFileSync(Settings.dataFilePath, JSON.stringify(this.data, null, 4));
    }

    namespace(namespace: string) {
        if (!this.data[namespace]) {
            this.data[namespace] = {
                [namespace]: {
                    created: new Date()
                }
            };
        }
        return this.data[namespace];
    }

}

export default new Data();
