Animation = require './Animation'
color = require 'color'

class DrawCircleX extends Animation
	config:
		duration: 10

	constructor: (opts) ->
    super opts

	draw: (elapsed) =>
    @fill color("green")
    @pixel 10, color("red")

module.exports = DrawCircleX
