var ledscape = require("../build/ledscape");

ledscape.anim('fadesingle');
ledscape.play('ring');

setTimeout(function() {
  ledscape.stop('ring');
  ledscape.anim('planets').start();
}, 3000);

setTimeout(ledscape.stopLoop, 10000);

