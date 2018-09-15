function markHotkey (options) {
  const { type, key, isShiftKey = false } = options

  // Return our "plugin" object, containing the `onKeyDown` handler.
  return {
    onKeyDown (e, change) {
      // Check that the key pressed matches our `key` option.
      if (!e.metaKey || e.key !== key || e.shiftKey !== isShiftKey) return null

      // Prevent the default characters from being inserted.
      e.preventDefault()

      // Toggle the mark `type`.
      change.toggleMark(type)
      return true
    }
  }
}

export default markHotkey
