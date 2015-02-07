path = require "path"
wrapper = require "./build/Release/wrapper"
glob = require "glob"

module.exports = wrapper

pixels = 64
strips = 48
# really its 24 pixels 1 strip but
# something thinks it is 64x48

bindir = path.resolve __dirname, "../build"
process.chdir bindir

wrapper.init pixels, strips

glob "anim/*.js", {}, (er, files) ->
  for file in files
    tokens = file.split '/'
    name = tokens[0]
    wrapper[name] = require bindir+'/'+file

