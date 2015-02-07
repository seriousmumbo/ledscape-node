path = require "path"
wrapper = require "./build/Release/wrapper"
module.exports = wrapper

pixels = 64
strips = 48
# really its 24 pixels 1 strip but
# something thinks it is 64x48

wrapper.init pixels, strips

module.exports.color = ->
  require "color"

module.exports.anim = (anim) ->
  bindir = path.resolve __dirname, "../build"
  console.log "**** " + bindir + "****"
  process.chdir bindir
  require "#{__dirname}/anim/#{anim}"
