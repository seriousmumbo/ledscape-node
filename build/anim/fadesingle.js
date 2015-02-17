var ledscape = require('../ledscape');
    
ledscape.addData({
  ring: { fade: { color: [15,90,90], period: 15.0 } }
})

var n = 0.0;
var p = 0;
ledscape.addSystems({ 
  fade: function(ring) {
    var elapsed = ledscape.data.frames.elapsed;
    if (elapsed > ring.fade.period/2.0) {
      n -= 0.5;
    } else {
      n += 0.5;
    }
    p++;
    if (p>23) p = 0;
    var rndn = Math.round(Math.abs(n));
    var rem = rndn % 255;
    ledscape.data['p'+p] = { render: { pos: p, color: [0,rem,rem]} };
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
