var ledscape = require('../../ledscape');
var color = require('color');

var entities = ['earth', 'venus', 'pixels', 'frames'];
var data = {
  pixels: { numpixels: 24,
            leds: new Array(24) },
  frames: { framenum: 0,
            numframes: 30 },
  earth: { orbit: { start: 2 }, 
           render: { color: 'blue' },
           controls: { state: 'running'}  },
  venus: { orbit: { start: 4 },
           controls: { state: 'running' },
           render: { color: 'LightYellow'} }
};

var systems = {
  orbit: function(entity) {
    if ('controls' in entity && 
        entity.controls.state != 'running') {
      return;
    }
    var frames = data.frames;
    if (!('pos' in entity)) { 
      entity.pos = entity.start;
      entity.moving = true;
    } else {
      entity.pos += (frames.delta * entity.speed);
    }
    entity.pos = Math.round(entity.pos);
    if (entity.pos > data.leds.numpixels) {
      entity.pos = 0;
    }
  },
  render: function(entity) {
    data.pixels.leds[entity.pos] = { color: color(entity.color) };
  },
  controls: function(entity) {
    
  },
  leds: function(entity) {
    entity.map(function(pixel, i) {
      if (i < entity.length-1) {
        ledscape.setColorNoWait(ledscape.framenum, i, pixel);
      } else {
        ledscape.setColor(ledscape.framenum, i, pixel);
      }
    }) 
  }
}

var gameloop = require('node-gameloop');

function runSystem(system) {
  var func = systems[system];
  Object.keys(data).filter(function(name) {
    return (system in data[name]);
  }).map(function(name) {
    func(data[name]);
  });
}

process.loopid = gameloop.setGameLoop(function(delta) {
  Object.keys(systems).map(function(name) {
    data.frames.delta = delta;
    runSystem(name);  
  });
  setTimeout(function() {
    gameloop.clearGameLoop(process.loopid);
    process.exit();
  }, 1000);
});

