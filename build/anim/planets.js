var ledscape = require('../ledscape');
require('./orbit.js');

var BLUE = [0,0,255];
var YELLOW = [255,255,0];
var ORANGE = [255,125,0];

ledscape.addData({
  earth: { orbit: { start:0, pos: 2, rps: 0.5 }, 
           render: { color: BLUE } },
  venus: { orbit: { start:0, pos: 14, rps: 1.0 },
           render: { color: YELLOW } },
  orange:{ orbit: { start:0, pos: 8, rps: 0.7 },
           render: { color: ORANGE } }
});

planetSetState = function(state) {
  for (var p=0; p<3; p++) {
    var planet = ['earth','venus','orange'][p];
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
