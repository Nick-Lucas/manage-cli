const program = require("commander")
const fs = require('fs')
const path = require('path')

const homedir = require('os').homedir();
const bashRC = path.join(homedir, "/.bashrc")
const readBashRC = () => {
  const file = fs.readFileSync(bashRC)
  const text = file.toString()
  const lines =  text.split("\n")
  return lines
}
const writeBashRC = (lines) => {
  const body = lines.join('\n')
  fs.writeFileSync(bashRC, body)
}

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
    const lines = readBashRC()
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
      const lines = readBashRC()
      const aliases = linesToModels(lines)
      if (aliases.some(alias => alias.name === name)) {
        console.error("Alias already exists. Has command: " + alias.command)
        return
      }
      
      const newAlias = buildAlias(name, command)
      const lastLineNumber = aliases[aliases.length - 1].lineNumber + 1
      lines.splice(lastLineNumber, 0, newAlias)
      writeBashRC(newLines)
    })

  program
    .command("remove <name>")
    .action((name) => {
      const lines = readBashRC()
      const aliases = linesToModels(lines)

      const alias = aliases.find(alias => alias.name === name)
      if (alias == null) {
        console.error("Alias does not exist")
        return
      }
      
      lines.splice(alias.lineNumber, 1)
      writeBashRC(lines)
    })
  
  
program.parse(process.argv)