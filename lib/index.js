const inquirer = require('inquirer'),
  logger = require('./logger'),
  path = require('path'),
  fs = require('fs')

const templateDir = './templates'
const root = process.cwd()

const promptInfo = [
  {
    type: 'input',
    name: 'app-name',
    message: "What's the name of your project"
  },
  {
    type: 'input',
    name: 'author-name',
    message: "What's your name?"
  }
]

function chalkGreet(authorName, appName) {
  const greet = `Good, dear ${authorName}.
I will create a project named ${appName} for you.
Please wait a moment.`
  logger.yellow(greet)
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

function render(str, options) {
  return str.replace(/{{{(.*)}}}/g, function(matched, group) {
    return options[group] || matched
  })
}

function copyFile(file, goal, options) {
  const fileString = fs.readFileSync(file).toString()
  const str = render(fileString, options)
  const dir = path.dirname(goal)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir)
  logger.blue(`--- create file ${goal}`)
  fs.writeFileSync(goal, str)
}

inquirer.prompt(promptInfo).then(answers => {
  const authorName = answers['author-name']
  const appName = answers['app-name']

  logger.green('-----------')

  chalkGreet(authorName, appName)

  const options = { appName, authorName }
  traverseDir(templateDir, file => {
    const goal = path.join(root, appName, path.relative(templateDir, file))
    copyFile(file, goal, options)
  })

  logger.green(`create app success`)

  logger.green('-----------')
})
