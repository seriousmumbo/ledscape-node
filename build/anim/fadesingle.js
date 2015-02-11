var ledscape = require('../ledscape');
    
ledscape.addData({
  ring: { control: { state: 'stopped' },
          fade: { color: 'cyan', period: 5.0 } }
})

ledscape.addSystems({ 
  fade: function(ring) {
    elapsed = ledscape.data.frames.elapsed;
    ratio = (1 - Math.cos(2*Math.PI*(elapsed * 1.0) / ring.period)) / 2;
    ledscape.fill(ring.color.clone().darken(1.0/ratio));
  };
});
