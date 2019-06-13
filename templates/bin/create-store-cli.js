/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const fs = require('fs')
const { camelize } = require('underscore.string')

const rootDir = path.resolve(__dirname, '../src/store')

function render(str, options) {
  Object.keys(options).forEach(key => {
    const re = new RegExp(key, 'g')
    str = str.replace(re, options[key])
  })
  return str
}

function createStore(storeName) {
  const writeDir = path.join(rootDir, storeName)
  const templatesDir = path.resolve(__dirname, './templates')
  const camlizedName = camelize(storeName)
  const options = { storeName: camlizedName, STORE_NAME: storeName.replace('-', '_').toUpperCase() }

  if (fs.existsSync(writeDir)) {
    const files = fs.readdirSync(writeDir)
    files.forEach(file => fs.unlinkSync(path.join(writeDir, file)))
    fs.rmdirSync(writeDir)
  }

  fs.mkdirSync(writeDir)

  const files = fs.readdirSync(templatesDir)
  files.forEach(file => {
    const templateFile = path.join(templatesDir, file)
    const writeFile = path.join(writeDir, file)
    const str = fs.readFileSync(templateFile).toString()
    fs.writeFileSync(writeFile, render(str, options))
  })

  // 修改index.ts文件
  {
    const indexFile = path.join(rootDir, 'index.ts')
    let str = fs.readFileSync(indexFile).toString()

    str = str.replace(/(import .+? from '.\/.*?'\n)+/, (match, group) => {
      return match + `import ${camlizedName} from './${storeName}'
`
    })

    str = str.replace(/const reducers = combineReducers\({(\n.*?Reducer: .*reducer,\n.*)+/, (match, group) => {
      return match + `
  ${camlizedName}Reducer: ${camlizedName}.reducer,`
    })

    str = str.replace(/const actions = {(\n.*?Actions: .*actions,\n.*)+/, (match, group) => {
      return match + `
  ${camlizedName}Actions: ${camlizedName}.actions,`
    })

    fs.writeFileSync(indexFile, str)
  }
}

createStore('test-lalal')