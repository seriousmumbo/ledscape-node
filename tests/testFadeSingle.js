var ledscape = require("../build/ledscape");

ledscape.anim('fadesingle');
ledscape.play('ring');

setTimeout(ledscape.stopLoop, 15000);

