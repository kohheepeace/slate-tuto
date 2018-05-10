module.exports = function (plugin, value) {
  const cursorBlock = value.document.getDescendant('_cursor_')
  const change = value.change()

  change.moveToRangeOf(cursorBlock)
  plugin.changes.removeTable(change)
  change.undo()

  return change
}
