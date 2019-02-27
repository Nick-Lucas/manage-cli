const bashrc = require("../bashrc")
const data = require('./data')

module.exports = {
  list: () => {
    const lines = bashrc.read()
    const aliases = data.linesToModels(lines)

    console.log("Aliases in your .bashrc")
    console.log("-----------------------")
    const maxNameLen = Math.max(...aliases.map(a => a.name.length))
    aliases.forEach(alias => {
      console.log(" -", alias.name.padEnd(maxNameLen), "=>", alias.command)
    })
  },

  add: (name, command) => {
    const lines = bashrc.read()
    const aliases = data.linesToModels(lines)
    const existingAlias = aliases.find(alias => alias.name === name)
    if (existingAlias) {
      console.error("Alias already exists. Has command: " + existingAlias.command)
      return
    }
    
    const newAlias = data.buildAlias(name, command)
    const lastLineNumber = aliases[aliases.length - 1].lineNumber + 1
    lines.splice(lastLineNumber, 0, newAlias)
    bashrc.write(lines)
    bashrc.reload()
  },

  remove: (name) => {
    const lines = bashrc.read()
    const aliases = data.linesToModels(lines)

    const alias = aliases.find(alias => alias.name === name)
    if (alias == null) {
      console.error("Alias does not exist")
      return
    }
    
    lines.splice(alias.lineNumber, 1)
    bashrc.write(lines)
    bashrc.reload()
  }
}