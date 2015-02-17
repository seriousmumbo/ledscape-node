var ledscape = require('./build/Release/wrapper');

var BLACK = [0,0,0];

var blackLeds = new Array();
for (var l =0; l<24; l++) {
  blackLeds.push(BLACK);
}
var data = {
  pixels: { numpixels: 24,
            leds: blackLeds},
  frames: { framenum: 0,
            numframes: 30 },
  frameswap: { swap: { doswap: true}  }
};


var framenum = 0;

var systems = {};

swapFrames = function() {
  if (framenum === 0) {
    framenum = 1;
  } else { 
    framenum = 0;
  }
}

clear = function(entity) {
  return;
  if (entity.clear === true) {
    for (var i=0; i<entity.leds.length; i++) {       
      entity.leds[i] = BLACK;    
    }
  }
}

var coreSystems = {
  render: function(entity) {
    data.pixels.leds[entity.render.pos] = entity.render.color;
  },
  controls: function(entity) {
    return;  
  },
  leds: function(entity) {
    entity.leds.map(function(c, i) {
      if (i < entity.leds.length-1) {
        if (!c) { console.log('not c'); c = BLACK; }
       ledscape.setColorNoWait(framenum, i, c[0]*.12, c[1]*.12, c[2]*.12);
      } else {
        ledscape.setColor(framenum, i, c[0]*.12, c[1]*.12, c[2]*.12);
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
  var keys = Object.keys(data);
  var keyslen = keys.length;
  for (var i=0; i<keyslen; i++) {
    if (system in data[keys[i]]) {
      
      func(data[keys[i]]);
    } else {
    }
  }
}

var int = null;
var start = new Date().getTime();
var prev = start;
var numframes = 0;

exports.startLoop = function() {
  numframes = 0;
  var start = new Date().getTime();
  var prev = start;
 int = setInterval(function() {
    numframes++;
    var syskeys = Object.keys(systems);
    var syskeyslen = syskeys.length;
    var coresyskeys = Object.keys(coreSystems);
    var coresyskeyslen = coresyskeys.length;
    var current = new Date().getTime();
    data.frames.elapsed = (current - start) / 1000.0;
    delta = (current - prev) / 1000.0;
    data.frames.delta = delta;
    prev = current;
    for (var n=0; n<syskeyslen; n++) {
      runSystem(systems, syskeys[n]);  
    }
    for (var n=0; n<coresyskeyslen; n++) {
      runSystem(coreSystems, coresyskeys[n]);
    }
  }, 1000.0/60.0);
}

exports.stopLoop = function() {
  var fps = numframes / data.frames.elapsed;  
  console.log(numframes + ' frames in ' + data.frames.elapsed +
              ' seconds, ' + fps + ' fps');
  clearInterval(int);
  setTimeout(function() {
    clearAll();
  }, 500);
}

exports.data = data;
exports.systems = systems;
exports.coreSystems = coreSystems;

