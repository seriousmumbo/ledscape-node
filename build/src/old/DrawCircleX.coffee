Animation = require './Animation'
color = require 'color'

class DrawCircleX extends Animation
	config:
		duration: 10

	constructor: (opts) ->
    super opts
    @offset = 0
    @colors = 'lime maroon navy olive orange blue yellow green aqua fuchsia ' +
              'salmon seashell red'
    @colors = @colors.split ' '
    for c,i in @colors
      @colors[i] = color(c)

	draw: (elapsed) =>
    @fill color('black')
    n = @offset % 24
    for i in [0..@colors.length-1]
      @pixel n, @colors[i]
      n += 1
      if n is 24
        n = 0
    @offset += 1

module.exports = DrawCircleX
