const expect = require('expect')

module.exports = function (plugin, value) {
  const cursorBlock = value.document.getDescendant('_cursor_')
  const change = value.change()

  change.moveToRangeOf(cursorBlock).move(6) // Cursor here: Before|After
  plugin.changes.insertTable(change)
  change.undo()

  // Back to previous cursor position
  expect(change.value.startBlock.text).toEqual('BeforeAfter')

  return change
}
