const chalk = require('chalk')

module.exports = {
  green: message => console.log(chalk.green(message)),

  blue: message => console.log(chalk.blue(message)),

  red: message => console.log(chalk.red(message)),

  yellow: message => console.log(chalk.yellow(message))
}
