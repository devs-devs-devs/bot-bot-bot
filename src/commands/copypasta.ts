export class Copypasta {

    private commands: object = ['cp', 'copypasta'];

    private copypastas: any;

    constructor() {
        console.log(this.commands, 'loaded');
    }

    reply(params: string, event: object) {

        const action = params.split(' ', 1)[0];

        const actions = ['add'];

        if (actions.indexOf(action) >= 0) {
            this.copypastas.push(params.substring(params.indexOf(' ')));
        } else {
            // find random copypasta
            if (!this.copypastas.length) return {
                text:'No copypastas'
            };

            return {
                text: this.copypastas[Math.floor(Math.random() * this.copypastas.length)]
            }
        }

    }

}
