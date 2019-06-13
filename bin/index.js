const program = require('commander'),
  handleCreateProject = require('./commanders/project'),
  hanldeOpenProject = require('./commanders/open'),
  handleRemoveProject = require('./commanders/remove'),
  handleListProject = require('./commanders/list'),
  handleOpenWorkProject = require('./commanders/work')

/**
 * program commander defination
 */
program
  .version('0.1.0')
  .option('-o, --open [value]', 'open the project')
  .option('-p, --project [value]', 'create a project')
  .option('-d, --delete [value]', 'delete the project')
  .option('-l, --list [type]', 'show all of the projects')
  .option('-w, --work [value]', 'open the work project')
  .command('[appName]', 'open project')
  .action(actionName => {
    console.log(actionName)
    hanldeOpenProject(actionName)
  })
  .parse(process.argv)

/**
 * program action hanlders
 */
if (program.open) {
  hanldeOpenProject(program.open)
}

if (program.work) {
  handleOpenWorkProject(program.work)
}

if (program.project) {
  handleCreateProject(program.project)
}

if (program.delete) {
  handleRemoveProject(program.delete)
}

if (program.list) {
  handleListProject(program.list)
}
