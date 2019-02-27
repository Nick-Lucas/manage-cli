#!/usr/bin/env node

const package = require('./package.json')
const program = require("commander")

program
  .version(package.version)
  .command("alias <cmd>", 'manage your bash aliases')
  .parse(process.argv)