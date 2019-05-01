const inquirer = require('inquirer'),
  logger = require('./logger'),
  path = require('path'),
  fs = require('fs'),
  program = require('commander')

const root = process.cwd()
const templateDir = path.join(__dirname, '../templates')

const promptInfo = [
  {
    type: 'input',
    name: 'app-name',
    message: "What's the name of your project"
  }
]

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

function createProject(appName) {
  logger.yellow('-----------')
  const options = { appName, authorName: 'xiaoHan' }
  traverseDir(templateDir, file => {
    const goal = path.join(root, appName, path.relative(templateDir, file))
    copyFile(file, goal, options)
  })
  logger.green(`your project has been created successfully.`)
  logger.yellow('-----------')
}

program
  .version('0.1.0')
  .option('-p, --project [value]', 'create a project')
  .parse(process.argv)

if (program.project) {
  console.log(program.project)
  if (program.project === true) {
    inquirer
      .prompt(promptInfo)
      .then(answers => createProject(answers['app-name']))
  } else {
    const appName = program.project
    createProject(appName)
  }
} else {
  logger.yellow("Please execute 'dodo -h' for help.")
}
