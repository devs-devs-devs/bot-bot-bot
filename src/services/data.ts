import { Pool, createPool } from 'mysql2/promise';
import Logger from './logger';
import chalk from 'chalk';

const { MYSQL_DB, MYSQL_USER, MYSQL_PASS, MYSQL_HOST } = process.env;

class Data {

    public pool: Pool;
    private serviceName: any = chalk.yellow('Data:');

    constructor() {
        Logger.log(this.serviceName, 'service loaded');
    }

    async createPool() {
        this.pool = await createPool({
            connectionLimit: 10,
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password: MYSQL_PASS,
            database: MYSQL_DB
        });
        Logger.log(this.serviceName, 'Pool created');
        return this.pool;
    }

}

export default new Data();
