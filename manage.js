const package = require('./package.json')
const program = require("commander")

program
  .version(package.version)
  .command("aliases <cmd>", 'manage your bash aliases')
  .parse(process.argv)