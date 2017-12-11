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
        const data = JSON.parse(fs.readFileSync(Settings.dataFilePath).toString());
        this.data = data;

        if (data.copypasta && data.copypasta.copypastas.hasOwnProperty('length')) {
            const copypastas = [...data.copypasta.copypastas];
            data.copypasta.copypastas = {};
            copypastas.forEach((copypasta,key) => {
                data.copypasta.copypastas[key] = copypasta;
            });
        }

        //Lets fix some shit here
        console.log();
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
