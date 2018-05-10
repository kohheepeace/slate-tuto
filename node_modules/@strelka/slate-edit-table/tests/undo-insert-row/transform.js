const expect = require('expect')

module.exports = function (plugin, value) {
  const cursorBlock = value.document.getDescendant('_cursor_')
  const initial = value.change({ save: false })
  initial.moveToRangeOf(cursorBlock)

  const toTest = initial.value.change()
  plugin.changes.insertRow(toTest)
  toTest.undo()

  // Back to previous cursor position
  expect(toTest.value.startBlock.text).toEqual('Col 1, Row 1')

  return toTest
}
