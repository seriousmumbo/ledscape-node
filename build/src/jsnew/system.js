var ledscape = require('../../ledscape');
var color = require('color');

var entities = ['earth', 'venus', 'pixels', 'frames', 'frameswap'];
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
           render: { color: 'lightyellow', pos: 4} },
  frameswap: { swap: { doswap: true}  }
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
  }
}

var coreSystems = {
  leds: function(entity) {
    entity.leds.map(function(pixel, i) {
      if (! 'rgb' in pixel) pixel = color('black');
      var c = pixel.rgb();
      if (i < entity.leds.length-1) {
        console.log('frame='+ledscape.framenum+' p='+i+
                    ' rgb = '+c.r+','+c.g+','+c.b);
        ledscape.setColorNoWait(ledscape.framenum, i, c.r, c.g, c.b);
      } else {
        console.log('setcolor (wait) frame='+ledscape.framenum+' p='+i+
                    ' rgb = '+c.r+','+c.g+','+c.b);
        ledscape.setColor(ledscape.framenum, i, c.r, c.g, c.b);
        console.log('setcolor returned');
      }
    });
  },
  swap: function(entity) {
    ledscape.draw(ledscape.framenum);
    ledscape.swapFrames();
  }
}

//var gameloop = require('node-gameloop');

function runSystem(set, system) {
  var func = set[system];
  console.log('runSystem ' + system);
  Object.keys(data).filter(function(name) {
    return (system in data[name]);
  }).map(function(name) {
    func(data[name]);
  });
}

var start = new Date().getTime();

var prev = start;

setInterval(function() {
  var current = new Date().getTime();
  var elapsed = current - start;
  var delta = elapsed - prev;
  prev = current; 
  console.log('top of loop');
  delta = 0.3;
  Object.keys(systems).map(function(name) {
    data.frames.delta = delta;
    runSystem(systems, name);  
  });
  Object.keys(coreSystems).map(function(name) {
    data.frames.delta = delta;
    runSystem(coreSystem, name);
  });
}, 1000.0/30.0);

//setTimeout(function() {
//  console.log('finishing');
//  gameloop.clearGameLoop(process.loopid);
//  process.exit();
//}, 5000);


