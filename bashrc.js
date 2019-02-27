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
  }
}

