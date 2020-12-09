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
  const row = `${command.padEnd(8, ' ')}| ${countStr}`
  console.debug(row)
  return row
}

const displayLog = () => {
  console.debug(`${program.length} steps in program.`)
  console.debug('-----------------------------------')
  const formattedLog = program.map(formatLogRow)
    .reduce((res, row) => {
      res += '\n'
      res += row
      return res
    }, '')

  return formattedLog
}

const logEvent = ({ instKey, evKey }) => {
  console.debug(`event ${evKey} called instruction ${instKey}`)
  if (
    log[instKey] &&
    typeof log[instKey] === 'object' &&
    log[instKey].length > 0
  ) {
    // Record another entry on a command already executed once
    log[instKey].push(evKey)
    return log[instKey]
  } else {
    // Record the first entry on a command
    log[instKey] = [evKey]
  }
  return log[instKey]
}

module.exports = {
  run: console.log('run'),
  executeStep: console.log('executeStep'),
  logEvent,
  displayLog
}
