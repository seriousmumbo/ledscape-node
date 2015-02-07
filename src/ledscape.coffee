path = require "path"
wrapper = require "./build/Release/wrapper"
glob = require "glob"

pixels = 64
strips = 48
# really its 24 pixels 1 strip but
# something thinks it is 64x48

bindir = path.resolve __dirname, "../build"
process.chdir bindir

outfuncs = {}

wrapper.init pixels, strips

for k, v of wrapper
  outfuncs[k] = v

files = glob.sync "anim/*.js", {}
for file in files
  tokens = file.split '/'
  name = tokens[0]
  outfuncs[name] = require bindir+'/'+file

module.exports = outfuncs
