var ledscape = require('../ledscape');
var color = require('color');
    
ledscape.addData({
  ring: { control: { state: 'stopped' },
          fade: { color: color('cyan'), period: 15.0 } },
  test: { render: { color: color('blue'), pos: 5 } }
})

ledscape.addSystems({ 
  fade: function(ring) {
    elapsed = ledscape.data.frames.elapsed;
      ratio = (1 - Math.cos(2 * Math.PI * (elapsed * 1.0) / (ring.fade.period * 1.0))) / 2;
    var clr = ring.fade.color.clone().rgb();
    clr.r *= ratio;
    clr.g *= ratio;
    clr.b *= ratio;
    ledscape.fill(clr);
  }
});

exports.start = function() {
  ledscape.play('ring');
}

exports.pause = function() {
  ledscape.pause('ring');
}

exports.stop = function() {
  ledscape.stop('ring');
}
