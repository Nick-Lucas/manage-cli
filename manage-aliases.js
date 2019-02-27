const program = require("commander")

const bashrc = require("./bashrc")

const linesToModels = (lines) => 
  lines
    .map((line, i) => ({
      lineNumber: i,
      line
    }))
    .filter(({ line }) => line.startsWith("alias "))
    .map(({ lineNumber, line }) => {
      const [name, command] = line
        .split(/alias (.*)=["']+(.*)["']+/)
        .filter(v => v.length > 0)

      return {
        lineNumber,
        name,
        command
      }
    })

const buildAlias = (name, command)  => `alias ${name}="${command}"`

program
  .command("list")
  .action(() => {
    const lines = bashrc.read()
    const aliases = linesToModels(lines)

    console.log("Aliases in your .bashrc")
    console.log("-----------------------")
    const maxNameLen = Math.max(...aliases.map(a => a.name.length))
    aliases.forEach(alias => {
      console.log(" -", alias.name.padEnd(maxNameLen), "=>", alias.command)
    })
  })

  program
    .command("add <name> <command>")
    .action((name, command) => {
      const lines = bashrc.read()
      const aliases = linesToModels(lines)
      if (aliases.some(alias => alias.name === name)) {
        console.error("Alias already exists. Has command: " + alias.command)
        return
      }
      
      const newAlias = buildAlias(name, command)
      const lastLineNumber = aliases[aliases.length - 1].lineNumber + 1
      lines.splice(lastLineNumber, 0, newAlias)
      bashrc.write(newLines)
    })

  program
    .command("remove <name>")
    .action((name) => {
      const lines = bashrc.read()
      const aliases = linesToModels(lines)

      const alias = aliases.find(alias => alias.name === name)
      if (alias == null) {
        console.error("Alias does not exist")
        return
      }
      
      lines.splice(alias.lineNumber, 1)
      bashrc.write(lines)
    })

program.parse(process.argv)