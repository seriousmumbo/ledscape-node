var ledscape = require('../../ledscape');

ledscape.addData({
  earth: { orbit: { pos: 2, rps: 0.5 }, 
           render: { color: 'blue' },
           controls: { state: 'running'}  },
  venus: { orbit: { pos: 14, rps: 1.0 },
           controls: { state: 'running' },
           render: { color: 'lightyellow'} },
  orange:{ orbit: { pos: 8, rps: 0.7 },
           controls: { state: 'running' },
           render: { color: 'orange' } }
});

var data = ledscape.data;

ledscape.addSystems({
  orbit: function(obj) {
    if ('controls' in obj && 
        obj.controls.state != 'running') {
      return;
    }
    var delta = data.frames.delta;
    obj.orbit.pos += delta * obj.orbit.rps * 24;
    if (obj.orbit.pos > data.pixels.numpixels) {
      obj.orbit.pos = obj.orbit.pos - data.pixels.numpixels;
    } 
    obj.render.pos = Math.round(obj.orbit.pos);
 }
});

ledscape.startLoop();

setTimeout(ledscape.stopLoop, 5000);
