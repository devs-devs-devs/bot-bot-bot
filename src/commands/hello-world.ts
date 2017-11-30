export class HelloWorld {

    private command: string = 'hello-world';

    constructor() {
        console.log(this.command, 'loaded');
    }

    reply(params: string, event: object) {
        return {
            text:'Hello, world'
        };
    }

}
