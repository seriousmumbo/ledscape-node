var ledscape = require('../../ledscape');
var color = require('color');

var entities = ['earth', 'venus', 'pixels', 'frames', 'frameswap'];
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
  earth: { orbit: { start: 2, pos:2, rps: 0.5 }, 
           render: { color: 'blue' },
           controls: { state: 'running'}  },
//  venus: { orbit: { start: 4, pos:4, rps: 2.0 },
//           controls: { state: 'running' },
//           render: { color: 'lightyellow'} },
  frameswap: { swap: { doswap: true}  }
};

var systems = {
  orbit: function(entity) {
    if ('controls' in entity && 
        entity.controls.state != 'running') {
      return;
    }
    var frames = data.frames;
    entity.orbit.pos += (frames.delta) * entity.orbit.rps * 24;
    if (entity.orbit.pos > data.pixels.numpixels) {
      entity.orbit.pos = entity.orbit.pos - data.pixels.numpixels;
    } 
    entity.render.pos = Math.round(entity.orbit.pos);
 },
  render: function(entity) {
    data.pixels.leds[entity.render.pos] = color(entity.render.color);
    
  },
  controls: function(entity) {
    return;  
  }
}

var coreSystems = {
  leds: function(entity) {
    entity.leds.map(function(pixel, i) {
      if (! 'rgb' in pixel) pixel = color('black');
      var c = pixel.clone().rgb();
      c.r = Math.round(c.r*0.02);
      c.g = Math.round(c.g*0.02);
      c.b = Math.round(c.b*0.02);
      if (i < entity.leds.length-1) {
        ledscape.setColorNoWait(ledscape.framenum, i, c.r, c.g, c.b);
      } else {
        ledscape.setColor(ledscape.framenum, i, c.r, c.g, c.b);
      }
    });
  },
  swap: function(entity) {
    ledscape.draw(ledscape.framenum);
    ledscape.swapFrames();
  },
  clear: ledscape.clear
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

var start = new Date().getTime();

var prev = start;

//setInterval(function() {
process.loopid = gameloop.setGameLoop(function(delta) {

  //var current = new Date().getTime();
  //var delta = current - prev;
  //prev = current; 
  //delta = delta / 1000.0;
  data.frames.delta = delta;
  Object.keys(systems).map(function(name) {
    runSystem(systems, name);  
  });
  Object.keys(coreSystems).map(function(name) {
    runSystem(coreSystems, name);
  });
}, 1000.0/60.0);

setTimeout(function() {
  console.log('finishing');
  gameloop.clearGameLoop(process.loopid);
  process.exit();
}, 5000);


