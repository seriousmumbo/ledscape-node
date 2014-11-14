ledscape-node
=============

## Using ##
### Install in NPM module ###
If the module is private, use `npm install git+ssh://git@github.com:seriousmumbo/ledscape-node.git`.

Otherwise, use `npm install seriousmumbo/ledscape-node`.

#### Using preinstalled animations ####
In CoffeeScript:

```coffee
ledscape = require "ledscape-node"
AllFade = ledscape.anim "AllFade"
allfade = new AllFade
	duration: 2.0
allfade.fade ->
	allfade.fade ->
		console.log "Faded twice."
```

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

#### Creating your own animations ####
In CoffeeScript:

```coffee
ledscape = require "ledscape-node"
ledscape.init pixelsPerStrip, strips
ledscape.fillColor frame, rgb...
# Other ledscape.* calls...
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

If running as `root`, use `npm install --unsafe-perm` instead, to confirm with NPM that you are requesting root permissions to make changes to the folder.

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