export class HelloWorld {

    private trigger: string = 'hello-world';

    constructor() {
        console.log(this.trigger, 'loaded');
    }

    reply(params: string) {
        return params;
    }

}
