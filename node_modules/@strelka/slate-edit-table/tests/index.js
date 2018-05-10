const test = require('ava')
const fs = require('fs')
const path = require('path')
const { Value, Schema } = require('slate')
const readMetadata = require('read-metadata')

const EditList = require('../lib')
const tests = fs.readdirSync(__dirname)
const resolve = (...p) => path.resolve(__dirname, ...p)
const plugin = EditList()
const schema = Schema.create({ plugins: [ plugin ] })

tests.filter(testName => testName !== 'snapshots').forEach((testName, index) => {
  if (testName[0] === '.' || path.extname(testName).length > 0) return

  test(testName, (t) => {
    const doc = readMetadata.sync(resolve(testName, 'input.yaml'))
    const runChange = require(resolve(testName, 'transform.js'))

    const value = Value.fromJSON(Object.assign({}, doc, { schema }))
    const change = runChange(plugin, value)
    const changedDoc = change.value.toJSON()

    t.snapshot(changedDoc)
  })
})
