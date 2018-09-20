function hasMark (value, type) {
  return value.activeMarks.some(mark => mark.type === type)
}

export default hasMark
