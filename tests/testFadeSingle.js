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

var Ledscape = require("../ledscape");
var FadeSingle = Ledscape.anim("FadeSingle");
var readline = require("readline");
var rl = readline.createInterface({ input: process.stdin, output: process.stdout });

var stopAtEnd = false;

var anim = new FadeSingle({
	from: 0,
	to: 255,
	duration: 10
});

function fade() {
	anim.fade(function() {
		if(!stopAtEnd) {
			//fade();
		}
	});
}

fade();

rl.question("Use [Enter] to stop the animation at the next endpoint.", function(ok) {
	stopAtEnd = true;
});