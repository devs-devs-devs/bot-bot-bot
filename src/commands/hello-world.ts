export class HelloWorld {

    private commands: object = ['hello-world'];

    constructor() {
        console.log(this.commands, 'loaded');
    }

    reply(params: string, event: object) {
        return {
            text:'Hello, world'
        };
    }

}
