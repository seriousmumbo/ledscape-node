Animation = require './Animation'
color = require 'color'

class FadeSingle extends Animation
	config:
		duration: 6

	constructor: (opts) ->
	  super opts

	draw: (elapsed) =>
    ratio = (1-Math.cos(2*Math.PI*(elapsed*1.0)/(@done*1.0)))/2
    clr = { r: 255*ratio, g:255*ratio, b:255*ratio }
    @fill color(clr)

module.exports = FadeSingle
