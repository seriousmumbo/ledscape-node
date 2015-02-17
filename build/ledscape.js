var path = require("path");
var wrapper = require("./build/Release/wrapper");
var glob = require("glob");

var BLACK = [0,0,0];

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
  if (!('controls' in data[obj])) {
    data[obj].controls = { state: state };
  } else {
    data[obj].controls.state = state;
  }
}

outfuncs.fill = function(clr) {
  for (var i=0; i<24; i++ ) {
    data['p'+i] = {render: {pos:i, color:clr}};
  }
}

outfuncs.fill(BLACK);
system.clearAll();

outfuncs.play = function(obj) {
  outfuncs.fill(BLACK);
  system.clearAll();
  setState(obj, 'running');
}

outfuncs.pause = function(obj) {
  setState(obj, 'paused');
  outfuncs.fill(BLACK);
  system.clearAll();
}

outfuncs.stop = function(obj) {
  setState(obj, 'stopped');
  outfuncs.fill(BLACK);
  system.clearAll();
}

outfuncs.startLoop = function() {
  system.startLoop();
}

outfuncs.stopLoop = function() {
  system.stopLoop();
}

outfuncs.anim = function(name) {
  return require(bindir+'/anim/'+name);
}

module.exports = outfuncs;


system.startLoop();
