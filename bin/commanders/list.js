const fs = require('fs'),
  logger = require('../tools/logger'),
  { projectDir, workProjectMap } = require('../config')

module.exports = function listProject(type) {
  let projects = []

  if (type === 'work') {
    projects = Object.keys(workProjectMap)
  }

  if (typeof type !== 'string' || type === 'project') {
    const files = fs.readdirSync(projectDir)
    projects = files
      .filter(file => /^dodo-.*/.test(file))
      .map(project => project.replace('dodo-', ''))
  }

  logger.yellow(projects.join(`     `))
}
