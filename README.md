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
