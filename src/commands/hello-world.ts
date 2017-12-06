import Data from '../services/data';

export class HelloWorld {

    private commands: object = ['hello-world'];
    private data: any;

    constructor() {
        console.log(this.commands, 'loaded');
        this.data = Data.namespace('hello-world');
    }

    reply(params: string, event: object) {
        return {
            text:'Hello, world'
        };
    }

}
