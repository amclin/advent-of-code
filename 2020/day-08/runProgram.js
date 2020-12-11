let log = []
log[0] = [1]
log[1] = [2, 8]
log[2] = [3]
log[3] = [6]
log[4] = [7]
log[6] = [4]
log[7] = [5]

let program = [
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

let accumulator = 0
let position = 1
let breaker = false

/**
 * API of commands this language supports
 */
const api = {
  nop: (a, b) => {
    console.debug(`doing a nop ${b}`)
    return a + 1
  },
  acc: (a, b) => {
    console.debug(`adding ${b} to accumulator`)
    accumulator += api[b.substr(0, 1)](
      0,
      Number(b.substr((1)))
    )
    return a + 1
  },
  jmp: (a, b) => {
    console.debug(`jumping from ${a} ${b} `)
    return a + api[b.substr(0, 1)](
      0,
      Number(b.substr((1)))
    )
  },
  '+': (x, y) => x + y,
  '-': (x, y) => x - y
}

const parseCommand = (inst) => {
  console.debug('Parsing ', inst)
  const [cmd, arg] = inst.split(' ')
  return { cmd, arg }
}

const execInstruction = (inst, instKey = 0, evKey = 0) => {
  const { cmd, arg } = parseCommand(inst)
  // Run the command
  // Support jumping by passing back next
  position = api[cmd](instKey, arg)
  logEvent({ instKey, evKey })
  // break out when reaching an infinite loop
  if (log[instKey].length > 1) {
    breaker = true
    console.error(`execuetd an error on ${instKey}`, inst, accumulator)
    // step back the accumulator
    if (cmd === 'acc') {
      if (arg.includes('+')) {
        api[cmd](0, arg.replace('+', '-'))
      }
      if (arg.includes('-')) {
        api[cmd](0, arg.replace('+-', '+'))
      }
    }
  }
  return position
}

const run = (insts) => {
  program = insts
  accumulator = 0
  position = 0
  log = []
  let evKey = 0

  // eslint-disable-next-line no-unmodified-loop-condition
  while (breaker === false) {
    evKey++
    execInstruction(program[position], position, evKey)
  }
}

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
  run,
  getAccumulator: () => accumulator,
  getPosition: () => position,
  execInstruction,
  parseCommand,
  logEvent,
  displayLog
}
