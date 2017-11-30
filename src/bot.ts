#!/usr/bin/env node
"use strict";
require('dotenv').config();
process.chdir(__dirname);

const { SLACK_TOKEN } = process.env;

if (!SLACK_TOKEN) throw 'Please provide a slack token';

import express = require('express');
import bodyParser = require('body-parser');
import BotBotBot from './commands';

const app = express();
app.use(bodyParser.json());
new BotBotBot(app);

app.listen(3002, console.log.bind(console));
