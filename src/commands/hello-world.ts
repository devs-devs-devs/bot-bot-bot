export class HelloWorld {

    private name: string = 'hello';

    constructor() {
        console.log(this.name, 'loaded');
    }

    reply(message: object) {
        console.log(message);
    }

}
