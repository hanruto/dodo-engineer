const inquirer = require('inquirer'),
  path = require('path'),
  fs = require('fs'),
  childProcess = require('child_process'),
  { projectDir } = require('../config')

function openProject(appName) {
  const dirPath = path.join(projectDir, `dodo-${appName}`)
  childProcess.execSync(`open -a vscode.app ${dirPath}`)
}

module.exports = function hanlder(appName) {
  const files = fs.readdirSync(projectDir)
  const projects = files
    .filter(file => /^dodo-.*/.test(file))
    .map(project => project.replace('dodo-', ''))

  if (typeof appName !== 'string') {
    const promptInfo = {
      type: 'list',
      choices: projects,
      name: 'project',
      message: 'Please select a project for open.'
    }

    inquirer.prompt(promptInfo).then(answers => {
      const select = answers['project']
      openProject(select)
    })
  } else {
    if (!projects.includes(appName)) {
      return console.log('not found this project')
    }
    openProject(appName)
  }
}
