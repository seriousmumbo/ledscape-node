var ledscape = require('../../ledscape');
var color = require('color');

var entities = ['earth', 'venus', 'pixels', 'frames'];
var blackLeds = new Array();
for (var l =0; l<24; l++) {
  blackLeds.push(color('black'));
}
var data = {
  pixels: { numpixels: 24,
            leds: blackLeds },
  frames: { framenum: 0,
            numframes: 30 },
  earth: { orbit: { start: 2, speed: 100.0 }, 
           render: { color: 'blue', pos: 2 },
           controls: { state: 'running'}  },
  venus: { orbit: { start: 4, speed: 200.0 },
           controls: { state: 'running' },
           render: { color: 'lightyellow', pos: 4} }
};

var systems = {
  orbit: function(entity) {
    if ('controls' in entity && 
        entity.controls.state != 'running') {
      return;
    }
    var frames = data.frames;
    entity.render.pos += (frames.delta) * entity.orbit.speed;
    entity.render.pos = Math.round(entity.render.pos);
    if (entity.render.pos > data.pixels.numpixels) {
      entity.render.pos = 0;
    }
  },
  render: function(entity) {
    data.pixels.leds[entity.render.pos] = color(entity.render.color);
  },
  controls: function(entity) {
    return;  
  },
  leds: function(entity) {
    return;
    entity.leds.map(function(pixel, i) {
      if (! 'rgb' in pixel) pixel = color('black');
      var c = pixel.rgb();
      if (i < entity.leds.length-1) {
        ledscape.setColorNoWait(ledscape.framenum, i, c.r, c.g, c.b);
      } else {
        ledscape.setColor(ledscape.framenum, i, c.r, c.g, c.b);
      }
    });
  }
}

//var gameloop = require('node-gameloop');

function runSystem(system) {
  var func = systems[system];
  Object.keys(data).filter(function(name) {
    return (system in data[name]);
  }).map(function(name) {
    func(data[name]);
  });
}

//process.loopid = gameloop.setGameLoop(function(delta) {
var start = new Date().getTime();

setInterval(function() {
  var delta = new Date().getTime()-start; 
  Object.keys(systems).map(function(name) {
    data.frames.delta = delta;
    console.log('delta='+delta, 'runsystem '+name);
    runSystem(name);  
  });
  //setTimeout(function() {
    //gameloop.clearGameLoop(process.loopid);
  //  process.exit();
  //}, 10000);
},1000.0/30.0);

