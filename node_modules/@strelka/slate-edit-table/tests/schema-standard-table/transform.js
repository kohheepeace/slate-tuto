module.exports = function (plugin, value) {
  return value.change().normalize()
}
