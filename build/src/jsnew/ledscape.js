var path = require("path");
var wrapper = require("./build/Release/wrapper");
var glob = require("glob");
var color = require("color");

var pixels = 64;
var strips = 48;
// really its 24 pixels 1 strip but
// something thinks it is 64x48

var bindir = path.resolve(__dirname, "../build");
process.chdir(bindir);

outfuncs = {};

wrapper.init(pixels, strips);

wrapper.dirty = [[],[]];

function trueArray() { return true; }

numpixels = 24;

function eachFrame() {
  return new Array(numpixels).map(trueArray); 
}

wrapper.dirty = wrapper.dirty.map(eachFrame);

Object.keys(wrapper).map(function(k) {
  outfuncs[k] = wrapper[k];
});

outfuncs.framenum = 0;

outfuncs.swapFrames = function() {
  if (outfuncs.framenum === 0) {
    outfuncs.framenum = 1;
  } else { 
    outfuncs.framenum = 0;
  }
}

outfuncs.clear = function(entity) {
  if (entity.clear === true) {
    for (var i=0; i<entity.leds.length; i++) {
      entity.leds[i] = color('black');
    }
  }
}

module.exports = outfuncs;

files = glob.sync("anim/*.js", {});

files.map(function(file) {
  var tokens = file.split('/');
  var name = tokens[1].substr(0, tokens[1].length-3);
  outfuncs[name] = require(bindir+'/'+file);
});

module.exports = outfuncs;
