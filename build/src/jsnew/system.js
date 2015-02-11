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
      c.r = Math.round(c.r*0.05);
      c.g = Math.round(c.g*0.05);
      c.b = Math.round(c.b*0.05);
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
  for (var i=0; i<23; i++) {
    ledscape.setColorNoWait(0, i, 0, 0, 0);
  }
  ledscape.setColor(0,23,0,0,0);
  ledscape.draw(0);
}

var gameloop = require('node-gameloop');

function runSystem(set, system) {
  var func = set[system];
  Object.keys(data).filter(function(name) {
    return (system in data[name]);
  }).map(function(name) {
    func(data[name]);
  });
}

exports.startLoop = function() {
  process.loopid = gameloop.setGameLoop(function(delta) {
    data.frames.delta = delta;
    Object.keys(systems).map(function(name) {
      runSystem(systems, name);  
    });
    Object.keys(coreSystems).map(function(name) {
      runSystem(coreSystems, name);
    });
  }, 1000.0/60.0);
}

exports.stopLoop = function() {
  gameloop.clearGameLoop(process.loopid);
  clearAll();
}

exports.data = data;
exports.systems = systems;
exports.coreSystems = coreSystems;

