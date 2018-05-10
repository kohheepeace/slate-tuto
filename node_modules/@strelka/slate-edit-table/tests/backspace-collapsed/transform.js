const expect = require('expect')

module.exports = function (plugin, value) {
  const blockStart = value.document.getDescendant('anchor')

  const change = value.change()
    .collapseToStartOf(blockStart)

  const result = plugin.onKeyDown(
    {
      preventDefault () {},
      stopPropagation () {}
    },
    { key: 'backspace' },
    change
  )

  expect(result).toBe(undefined)
  return change
}
