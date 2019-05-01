const inquirer = require('inquirer'),
  logger = require('./logger'),
  path = require('path'),
  fs = require('fs')

const remoteProjectName = 'engineer'
const remoteGitAddress = `https://github.com/soWhiteSoColl/${remoteProjectName}.git`
const promptInfo = [
  {
    type: 'input',
    name: 'author-name',
    message: "Hello, what's your name?"
  },
  {
    type: 'input',
    name: 'app-name',
    message: 'Please give a name for your application.'
  }
]

function chalkGreet(authorName, appName) {
  logger.green('-----------')
  const greet = `Good, dear ${authorName}.
I will create a project named ${appName} for you.
Please wait a moment.`
  logger.blue(greet)
  logger.green('-----------')
}

function traverseDir(dir, callback) {
  let dirPath = path.isAbsolute(dir) ? dir : path.resolve(dir)
  const files = fs.readdirSync(dirPath)
  files.map(file => {
    const filePath = path.join(dirPath, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      traverseDir(filePath, callback)
    } else {
      callback(filePath)
    }
  })
}

function copyFile(file, goal, options) {
  const fileString = fs.readFileSync(file).toString()
  const str = render(fileString, options)
  const dir = path.dirname(goal)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)
  fs.writeFileSync(goal, str)
}

function render(str, options) {
  return str.replace(/{{{(.*)}}}/, function(matched, group) {
    return options[group] || group
  })
}

const appName = 'app'
const templateDir = './templates'
const root = process.cwd()

traverseDir(templateDir, file => {
  const goal = path.join(root, appName, path.relative(templateDir, file))
  copyFile(file, goal, { appName })
})

// inquirer.prompt(promptInfo).then(answers => {
//   const authorName = answers['author-name']
//   const appName = answers['app-name']
//   chalkGreet(authorName, appName)
// })
