var ledscape = require('../ledscape');


ledscape.addSystems({
  orbit: function(obj) {
    var data = ledscape.data;
    var delta = data.frames.delta;
    var elapsed = data.frames.elapsed;
    //obj.orbit.pos += delta * obj.orbit.rps * 24.0;
    obj.orbit.pos = (elapsed * obj.orbit.rps * 24.0 + 
                     obj.orbit.start) % 24;
    if (obj.orbit.pos > data.pixels.numpixels) {
      obj.orbit.pos = obj.orbit.pos - data.pixels.numpixels;
    } 
    obj.render.pos = Math.round(obj.orbit.pos);
 }
});

