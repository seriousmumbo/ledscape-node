###
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
###

class AllFade
	config:
		pixelsPerStrip: 64
		numberOfStrips: 48
		fps: 100
		from: 0
		to: 255
		duration: 0.65
	constructor: (opts) ->
		for key, val of opts
			@config[key] = val
		@Ledscape = require "../ledscape"
		@Color = @Ledscape.color()
		@frame0 = true # is frame 0
		@Ledscape.init @config.pixelsPerStrip, @config.numberOfStrips
	fade: (@cb) ->
		@start = new Date().getTime()
		@done = Math.round @config.duration * 1000
		@range = Math.abs @config.to - @config.from
		@dir = if @config.from > @config.to then -1 else 1
		@interval = Math.round 1000.0 / @config.fps
		@timer = setInterval @draw, @interval
		@draw()
	draw: =>
		rgb = @time2color()
		return @cb() if !rgb
		framenum = @frame0 ? 0 : 1
		@Ledscape.fillColor framenum, rgb...
		@Ledscape.draw framenum
		@frame0 = !@frame0
	time2color: =>
		elapsed = new Date().getTime() - @start
		color = new @Color '#22ff66'
		if elapsed >= @done
			clearInterval @timer
			return false
		ratio = (elapsed*1.0)/(@done*1.0)
		color
			.rotate 180.0*ratio
			.saturate ratio
			.whiten ratio
		color.rgbArray()

module.exports = AllFade