var ledscape = require('../ledscape');
require('./orbit.js');

ledscape.addData({
  head: { orbit: { pos: 3, rps: 1 }, 
           render: { color:'#00ff00' },
           controls: { state: 'running'}  },
  middle: { orbit: { pos: 2, rps: 1.0 },
           controls: { state: 'running' },
           render: { color: '#00aa00'} },
  end:{ orbit: { pos: 1, rps: 1.0 },
           controls: { state: 'running' },
           render: { color: '#004400' } }
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
