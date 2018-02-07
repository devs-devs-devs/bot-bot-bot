#!/usr/bin/env node
"use strict";
require('dotenv').config();
process.chdir(__dirname);

const canRun = [
    'SLACK_TOKEN',
    'VERIFICATION_TOKEN',
    'TRIGGER_PREFIX',
    'BOT_NAME',
    'ICON_EMOJI',
    'GITHUB_SECRET',
    'MYSQL_DB',
    'MYSQL_USER',
    'MYSQL_PASS',
    'MYSQL_HOST',
    'REPORT_CHANNEL'
].every((envVar: string) => {
    const { env } = process;
    return env.hasOwnProperty(envVar) && env[envVar] !== '';
});

if (!canRun) throw `Please check all the environment variables exist`;

import express = require('express');
import bodyParser = require('body-parser');
import BotBotBot from './commands';
import Logger from './services/logger';
import chalk from 'chalk';

const app = express();
app.use(bodyParser.json());
new BotBotBot(app);

app.listen(3003, () => Logger.log(chalk.green('Express:'), 'Listening on 3003'));
