const inquirer = require('inquirer'),
  path = require('path'),
  fs = require('fs'),
  childProcess = require('child_process'),
  { projectDir } = require('../config')

function removeProject(appName) {
  const dirPath = path.join(projectDir, `dodo-${appName}`)
  childProcess.execSync(`rm -rf ${dirPath}`)
}

module.exports = function hanlder(appName) {
  if (typeof appName !== 'string') {
    const files = fs.readdirSync(projectDir)
    const projects = files
      .filter(file => /^dodo-.*/.test(file))
      .map(project => project.replace('dodo-', ''))

    const promptInfo = {
      type: 'list',
      choices: projects,
      name: 'project',
      message: 'Please select a project for open.'
    }

    inquirer.prompt(promptInfo).then(answers => {
      const select = answers['project']
      removeProject(select)
    })
  } else {
    removeProject(appName)
  }
}
