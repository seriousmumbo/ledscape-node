var Ledscape = require("../ledscape");
var AllFade = Ledscape.anim("AllFade");
var readline = require("readline");
var rl = readline.createInterface({ input: process.stdin, output: process.stdout });

var stopAtEnd = false;

function fadeOut() {
	var allfade = new AllFade({
		from: 255,
		to: 0,
		duration: 1.0
	});
	allfade.fade(function() {
		if(!stopAtEnd) {
			fadeIn();
		}
	});
}

function fadeIn() {
	var allfade = new AllFade({
		from: 0,
		to: 255,
		duration: 1.0
	});
	allfade.fade(function() {
		fadeOut();
	});
}

fadeIn();

rl.question("Use [Enter] to stop the animation at the next endpoint.", function(ok) {
	stopAtEnd = true;
});