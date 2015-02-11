var ledscape = require('./build/Release/wrapper');
var color = require('color');

var blackLeds = new Array();
for (var l =0; l<24; l++) {
  blackLeds.push(color('black'));
}
var data = {
  pixels: { numpixels: 24,
            leds: blackLeds,
            clear: true },
  frames: { framenum: 0,
            numframes: 30 },
  frameswap: { swap: { doswap: true}  }
};

var framenum = 0;

var systems = {};

swapFrames = function() {
  if (outfuncs.framenum === 0) {
    outfuncs.framenum = 1;
  } else { 
    outfuncs.framenum = 0;
  }
}

clear = function(entity) {
  if (entity.clear === true) {
    for (var i=0; i<entity.leds.length; i++) {       
      entity.leds[i] = color('black');    
    }
  }
}

var coreSystems = {
  render: function(entity) {
    data.pixels.leds[entity.render.pos] = color(entity.render.color);
  },
  controls: function(entity) {
    return;  
  },
  leds: function(entity) {
    entity.leds.map(function(pixel, i) {
      if (! 'rgb' in pixel) pixel = color('black');
      var c = pixel.clone().rgb();
      c.r = Math.round(c.r*0.25);
      c.g = Math.round(c.g*0.25);
      c.b = Math.round(c.b*0.25);
      if (i < entity.leds.length-1) {
        ledscape.setColorNoWait(framenum, i, c.r, c.g, c.b);
      } else {
        ledscape.setColor(framenum, i, c.r, c.g, c.b);
      }
    });
  },
  swap: function(entity) {
    ledscape.draw(framenum);
    swapFrames();
  },
  clear: clear
}

clearAll = function() {
  for (var f=0; f<2; f++) {
    for (var i=0; i<23; i++) {
      ledscape.setColorNoWait(f, i, 0, 0, 0);
    }
    ledscape.setColor(f,23,0,0,0);
    ledscape.draw(f);
  }
}

exports.clearAll = clearAll;

function runSystem(set, system) {
  var func = set[system];
  Object.keys(data).filter(function(name) {
    return (system in data[name]);
  }).map(function(name) {
    var hasControls = ('controls' in data[name]);
    if (!hasControls || (hasControls 
        && data[name].controls.state === 'running')) {
      func(data[name]);
    }
  });
}

var int = null;
var start = new Date().getTime();
var prev = start;
exports.startLoop = function() {
  var start = new Date().getTime();
  var prev = start;
  int = setInterval(function() {
    var current = new Date().getTime();
    data.frames.elapsed = (current - start) / 1000.0;
    delta = (current - prev) / 1000.0;
    data.frames.delta = delta;
    prev = current;
    Object.keys(systems).map(function(name) {
      runSystem(systems, name);  
    });
    Object.keys(coreSystems).map(function(name) {
      runSystem(coreSystems, name);
    });
  }, 1000.0/60.0);
}

exports.stopLoop = function() {
  clearInterval(int);
  setTimeout(function() {
    clearAll();
  }, 500);
}

exports.data = data;
exports.systems = systems;
exports.coreSystems = coreSystems;

