import chalk from 'chalk';

class Logger {

    private serviceName: any = chalk.yellow('Logger:');

    constructor() {
        this.log(this.serviceName, 'service loaded');
    }

    getDate() {
        return chalk.gray(new Date().toISOString().split('T').join(' ').split('.')[0])
    }

    log(...args: any[]) {
        console.log.apply(console, [this.getDate(), ...args]);
    }

    error(...args:any[]) {
        console.error.apply(console, [this.getDate(), ...args.map(arg => chalk.red(arg))]);
    }
}

export default new Logger();
