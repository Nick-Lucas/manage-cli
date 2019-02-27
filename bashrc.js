const fs = require('fs')
const path = require('path')
const homedir = require('os').homedir();

const filePath = path.join(homedir, "/.bashrc")

module.exports = {
  read: () => {
    const file = fs.readFileSync(filePath)
    const text = file.toString()
    const lines =  text.split("\n")
    return lines
  },
  write: (lines) => {
    const body = lines.join('\n')
    fs.writeFileSync(filePath, body)
  },
  reload: () => {
    // TODO: find a way to force the parent shell to reload
    //
    // const exec = require('child_process').exec
    // const result = exec(`source "${filePath}"`)
    // result.on('exit', code => {
    //   if (code === 0) {
    //     console.log("Updated your .bashrc")
    //   } else {
    //     console.error("Could not reload your .bashrc")
    //   }
    // })

    console.log("Now reload your .bashrc:\n")
    console.log(`    source "${filePath}"\n`)
  }
}

