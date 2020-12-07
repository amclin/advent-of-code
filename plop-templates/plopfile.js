module.exports = function (plop) {
  const zeroPad = (day) => {
    if (day.length < 2) {
      day = `0${day}`
    }
    return `${day}`
  }

  // controller generator
  plop.setGenerator('Day', {
    description: 'application controller logic',
    prompts: [{
      type: 'input',
      name: 'year',
      message: 'Which year?',
      default: new Date().getFullYear()
    }, {
      type: 'input',
      name: 'day',
      message: 'Which day?'
    }],
    actions: (data) => {
      return [{
        type: 'addMany',
        destination: `../{{year}}/day-${zeroPad(data.day)}`,
        templateFiles: 'day/**.*'
      }]
    }
  })
}
