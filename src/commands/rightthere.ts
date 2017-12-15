import Command from './command';
import Reply from '../services/reply';
import { shuffle } from '../utils/shuffle';
import { SlackEvent, SlackMessage } from '../interfaces/slack';

export class RightThere extends Command {

    constructor() {
        super('rightthere', ['rt', 'rightthere']);
        this.init();
    }

    async init() {
        // Does nothing
    }

    reply(body: SlackMessage) {
        const event = body.event as SlackEvent;
        const { action, params } = this.parseText(event.text);

        const typeOfShit = action;
        const emojis = params.split(' ');

        const reply = [];

        reply.push(this.randomEmojis(emojis, 7));
        reply.push(`${typeOfShit} shit`);
        reply.push(this.mixWordCase(`${typeOfShit} shit`));
        reply.push(this.randomEmojis(emojis, 1));
        reply.push('thats');
        reply.push(this.randomEmojis(emojis, 1));
        reply.push(`some ${typeOfShit}`);
        reply.push(this.randomEmojis(emojis, 2));
        reply.push(`shit right`);
        reply.push(this.randomEmojis(emojis, 2));
        reply.push(`there`);
        reply.push(this.randomEmojis(emojis, 3));
        reply.push(`right`);
        reply.push(this.randomEmojis(emojis, 1));
        reply.push(`there`);
        reply.push(this.randomEmojis(emojis, 2));
        reply.push(`if i do say so myself`);
        reply.push(this.randomEmojis(emojis, 1));
        reply.push(`i say so`);
        reply.push(this.randomEmojis(emojis, 1));
        reply.push(`thats what im talking about right there right there (chorus: ᶦᵗ'ˢ ʳᶦᵍʰᵗ ᵗʰᵉʳᵉ) mMMMMᎷМ`);
        reply.push(this.randomEmojis(emojis, 4));
        reply.push(`ZO0ОଠOOOOOОଠଠOoooᵒᵒᵒᵒᵒᵒᵒᵒᵒᵐ:`);
        reply.push(this.randomEmojis(emojis, 10));
        reply.push(`${typeOfShit} shit`);

        Reply({
            text: reply.join(' ')
        }, event);

    }

    mixWordCase(word: string) {
        let newWord = '';
        for (let i=0;i<word.length;i++) {
            newWord += word[i][Math.random() >= 0.5 ? 'toUpperCase' : 'toLowerCase']();
        }
        return newWord;
    }

    randomEmojis(emojis: string[], emojiLength: number = 5) {

        let string = '';

        for (let i=0; i<emojiLength; i++) string += shuffle(emojis)[0];

        return string;

    }

}
