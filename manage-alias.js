const program = require("commander")
const commands = require('./manage-alias/commands')

program
  .command("list")
  .action(commands.list)

program
  .command("add <name> <command>")
  .action(commands.add)

program
  .command("remove <name>")
  .action(commands.remove)

program.parse(process.argv)