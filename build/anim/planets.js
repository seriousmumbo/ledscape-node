var ledscape = require('../ledscape');
require('./orbit.js');

ledscape.addData({
  earth: { orbit: { pos: 2, rps: 0.5 }, 
           render: { color: 'blue' },
           controls: { state: 'stopped'}  },
  venus: { orbit: { pos: 14, rps: 1.0 },
           controls: { state: 'stopped' },
           render: { color: 'lightyellow'} },
  orange:{ orbit: { pos: 8, rps: 0.7 },
           controls: { state: 'stopped' },
           render: { color: 'orange' } }
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
