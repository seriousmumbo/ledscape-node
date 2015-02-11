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

system = require('./system.js');
data = system.data;
systems = system.systems;
outfuncs.data = data;
outfuncs.systems = systems;
outfuncs.coreSystems = system.coreSystems;

outfuncs.addData = function(addData) {
  for (var k in addData) {
    data[k] = addData[k];
  }
}

outfuncs.addSystems = function(addSystem) {
  for (var k in addSystem) {
    systems[k] = addSystem[k];
  }
}


setState = function(obj, state) {
  if (!('controls' in data[planet])) {
    data[obj].controls = { state: state };
  } else {
    data[obj].controls.state = state;
  }
}

outfuncs.fill = function(clr) {
  data.ringPixels = [];
  for (var i=0; i<24; i++ ) {
    data.ringPixels.push({render: {pos:i, color:clr}});
  }
}

outfuncs.play = function(obj) {
  setState(obj, 'running');
}

outfuncs.pause = function(obj) {
  setState(obj, 'paused');
}

outfuncs.stop = function(obj) {
  setState(obj, 'stopped');
}

outfuncs.startLoop = function() {
  system.startLoop();
}

outfuncs.stopLoop = function() {
  system.stopLoop();
}

module.exports = outfuncs;

files = glob.sync("anim/*.js", {});

files.map(function(file) {
  var tokens = file.split('/');
  var name = tokens[1].substr(0, tokens[1].length-3);
  outfuncs[name] = require(bindir+'/'+file);
});

system.startLoop();

module.exports = outfuncs;
