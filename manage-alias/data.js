module.exports = {
  linesToModels: (lines) => 
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
      }),
  buildAlias: (name, command)  => `alias ${name}="${command}"`
}