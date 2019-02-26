const program = require("commander")
const fs = require('fs')
const path = require('path')

const homedir = require('os').homedir();
const bashRC = path.join(homedir, "/.bashrc")

program
  .command("list")
  .action(() => {
    const file = fs.readFileSync(bashRC)
    const text = file.toString()
    const lines =  text.split("\n")
    const aliases = lines
      .filter(line => line.startsWith("alias "))
      .map(line => {
        const [name, command] = line
          .split(/alias (.*)="(.*)"/)
          .filter(v => v.length > 0)
        return {
          name,
          command
        }
      })


    console.log("Aliases in your .bashrc")
    console.log("-----------------------")
    aliases.forEach(alias => {
      console.log(" - Name:    ", alias.name)
      console.log("   Command: ", alias.command)
      console.log('')
    })
  })
  
  
program.parse(process.argv)