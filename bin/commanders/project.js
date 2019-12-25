const inquirer = require('inquirer'),
  path = require('path'),
  fs = require('fs'),
  childProcess = require('child_process'),
  logger = require('../tools/logger'),
  { templateDir, projectDir } = require('../config')

function traverseDir(dir, callback) {
  let dirPath = path.isAbsolute(dir) ? dir : path.resolve(dir)
  const files = fs.readdirSync(dirPath)
  files.map(file => {
    if (file === 'node_modules') return false

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
  return str.replace(/{{{(.*)}}}/g, function (matched, group) {
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

function installNpm(appName) {
  childProcess.execSync(`cd ${appName} && cnpm i`)
  logger.green('All package has been installed.')
}

function createProject(appName) {
  appName = `dodo-${appName}`
  const options = { appName, authorName: 'xiaoHan' }
  logger.green(`start build your project.`)

  const appRoot = path.join(projectDir, appName)
  if (fs.existsSync(appRoot)) fs.rmdirSync(appRoot)

  traverseDir(templateDir, file => {
    const goal = path.join(appRoot, path.relative(templateDir, file))
    copyFile(file, goal, options)
  })

  const promptInfo = {
    type: 'confirm',
    name: 'need-install',
    message: 'Can I help you with installation of your npm?'
  }

  inquirer
    .prompt(promptInfo)
    .then(answers => answers['need-install'] && installNpm(appName))
}

module.exports = function handler(appName) {
  if (typeof appName !== 'string') {
    const promptInfo = [
      {
        type: 'input',
        name: 'app-name',
        message: "What's the name of your project?"
      },
      {
        type: 'input',
        name: 'author-name',
        message: "What's your name?"
      }
    ]

    inquirer
      .prompt(promptInfo)
      .then(answers => createProject(answers['app-name']))
  } else {
    createProject(appName)
  }
}
