ledscape-node
=============

## Using ##
### Install in NPM module ###
If the module is private, use `npm install git+ssh://git@github.com:seriousmumbo/ledscape-node.git`.

Otherwise, use `npm install seriousmumbo/ledscape-node`.
You can also clone it and run `npm install`.

#### Using preinstalled animations ####
In JavaScript:

```node
var ledscape = require("ledscape-node");
var AllFade = ledscape.anim("AllFade");
var allfade = new AllFade({duration: 2.0});
allfade.fade(function() {
	allfade.fade(function() {
		console.log("Faded twice.");
	});
});
```

In JavaScript:

```node
var ledscape = require("ledscape-node")
ledscape.init(pixelsPerStrip, strips);
ledscape.fillColor(frame, rgb[0], rgb[1], rgb[2]);
// Other ledscape.* calls...
```

## Testing ##
You can download a copy and test it locally.

	git clone git@github.com:seriousmumbo/ledscape-node.git
	cd ledscape-node
	npm install
	npm test

## Building

Building takes quite some time and has extra dependencies so
the build doesn't happen every time you install.

If you change the code you will need to run `./build.sh`.

## License ##

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.  
The full text of the license should be in `LICENSE`.

If you have questions about the software or the license, we can be contacted through the [GitHub repository](https://github.com/seriousmumbo/ledscape-node), or via the information on [our website](http://seriousmumbo.com/).
