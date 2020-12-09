// Suppress logging
if (!process.env.DEBUG) {
  console.debug = () => {}
  console.log = () => {}
}

module.exports = console
// module.exports = {
//   debug: console.debug,
//   info: console.info,
//   log: console.log,
//   warn: console.warn,
//   error: console.error
// }
