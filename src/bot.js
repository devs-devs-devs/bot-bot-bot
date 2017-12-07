#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
process.chdir(__dirname);
var SLACK_TOKEN = process.env.SLACK_TOKEN;
if (!SLACK_TOKEN)
    throw 'Please provide a slack token';
var express = require("express");
var bodyParser = require("body-parser");
var commands_1 = require("./commands");
var app = express();
app.use(bodyParser.json());
new commands_1.default(app);
app.listen(3002, console.log.bind(console));
