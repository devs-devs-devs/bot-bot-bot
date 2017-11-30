#!/usr/bin/env node
"use strict";
process.chdir(__dirname);

import express = require('express');
import bodyParser = require('body-parser');
import BotBotBot from './commands';

const app = express();
app.use(bodyParser.json());
new BotBotBot(app);

app.listen(3002, console.log.bind(console));


// for (const command in commands) {
//     if (commands.hasOwnProperty(command)) {
//         let cmd = new commands[command]();
//         cmd.reply({message:'hiya'});
//     }
// }
//
