var ledscape = require('../ledscape');
require('./orbit.js');

ledscape.addData({
  head: { orbit: { pos: 0, start:3, rps: 1.0 }, 
           render: { color: [0,255,0] } },
  middle: { orbit: { pos: 0, start:2, rps: 1.0 },
           render: { color: [0,200, 0] } },
  end:{ orbit: { pos: 0, start:1, rps: 1.0 },
           render: { color: [0,100,0] } }
});

planetSetState = function(state) {
  for (var p=0; p<3; p++) {
    var planet = ['head','middle','end'][p];
    ledscape[state](planet);
  }
}

exports.pause = function() {
  planetSetState('pause');
}

exports.start = function() {
  planetSetState('play');
}

exports.stop = function() {
  planetSetState('stop');
}
