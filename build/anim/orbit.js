var ledscape = require('../ledscape');

var data = ledscape.data;

ledscape.addSystems({
  orbit: function(obj) {
    var delta = data.frames.delta;
    obj.orbit.pos += delta * obj.orbit.rps * 24;
    if (obj.orbit.pos > data.pixels.numpixels) {
      obj.orbit.pos = obj.orbit.pos - data.pixels.numpixels;
    } 
    obj.render.pos = Math.round(obj.orbit.pos);
 }
});

