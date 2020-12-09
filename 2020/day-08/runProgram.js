const log = []
log[0] = [1]
log[1] = [2, 8]
log[2] = [3]
log[3] = [6]
log[4] = [7]
log[6] = [4]
log[7] = [5]

const program = [
  'nop +0',
  'acc +1',
  'jmp +4',
  'acc +3',
  'jmp -3',
  'acc -99',
  'acc +1',
  'jmp -4',
  'acc +6'
]

const formatLogRow = (command, idx, program) => {
  let countStr
  if (!log[idx]) {
    countStr = ''
  }
  if (log[idx] && log[idx].length === 1) {
    countStr = `${log[idx][0]}`
  }
  if (log[idx] && log[idx].length > 1) {
    countStr = `${log[idx].join(', ')}(!)`
  }

  return `${command.padEnd(8, ' ')}| ${countStr}`
}

const displayLog = () => {
  const formattedLog = program.map(formatLogRow)
    .reduce((res, row) => {
      res += '\n'
      res += row
      return res
    }, '')

  console.debug(formattedLog)
  return formattedLog
}

module.exports = {
  run: console.log('run'),
  executeStep: console.log('executeStep'),
  logStep: console.log('logStep'),
  displayLog
}
