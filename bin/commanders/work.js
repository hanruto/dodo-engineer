const inquirer = require('inquirer'),
  path = require('path'),
  fs = require('fs'),
  childProcess = require('child_process'),
  { workDir, workProjectMap } = require('../config')

function openProject(appName) {
  const factName = workProjectMap[appName]

  if (!factName) return console.log('not found this project')

  const dirPath = path.join(workDir, factName)
  childProcess.execSync(`open -a vscode.app ${dirPath}`)
}

module.exports = function hanlder(appName) {
  if (typeof appName !== 'string') {
    const promptInfo = {
      type: 'list',
      choices: Object.keys(workProjectMap),
      name: 'project',
      message: 'Please select a project for open.'
    }

    inquirer.prompt(promptInfo).then(answers => {
      const select = answers['project']
      openProject(select)
    })
  } else {
    openProject(appName)
  }
}
