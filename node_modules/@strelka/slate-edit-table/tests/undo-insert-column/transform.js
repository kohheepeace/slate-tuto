const expect = require('expect')

module.exports = function (plugin, value) {
  const cursorBlock = value.document.getDescendant('_cursor_')
  const initial = value.change()
  initial.moveToRangeOf(cursorBlock)

  const change = initial.value.change()
  plugin.changes.insertColumn(change)
  change.undo()

  // Back to previous cursor position
  expect(change.value.startBlock.text).toEqual('Col 1, Row 1')

  return change
}
