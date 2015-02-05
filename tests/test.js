/*
	Copyright 2014 Serious Mumbo, Inc.

	This file is part of ledscape-node.

	ledscape-node is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	ledscape-node is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with ledscape-node.  If not, see <http://www.gnu.org/licenses/>.
*/

var Ledscape = require("../build/ledscape");
var AllFade = Ledscape.anim("AllFade");
var readline = require("readline");
var rl = readline.createInterface({ input: process.stdin, output: process.stdout });

var stopAtEnd = false;

var allfadeIn = new AllFade({
	from: 0,
	to: 255,
	duration: 1.0
});

var allfadeOut = new AllFade({
	from: 255,
	to: 0,
	duration: 1.0
});

function fadeOut() {
	allfadeOut.fade(function() {
		if(!stopAtEnd) {
			fadeIn();
		}
	});
}

function fadeIn() {
	allfadeIn.fade(function() {
		fadeOut();
	});
}

fadeIn();

rl.question("Use [Enter] to stop the animation at the next endpoint.", function(ok) {
	stopAtEnd = true;
});
