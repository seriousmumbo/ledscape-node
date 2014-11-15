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

class FadeSingle
	config:
		pixelsPerStrip: 64
		numberOfStrips: 48
		fps: 100
		duration: 20
		color: [190,190,190]
		brightness: 1
	constructor: (opts) ->
		for key, val of opts
			@config[key] = val
		@Ledscape = require "../ledscape"
		@frame0 = true # is frame 0
		@Ledscape.init @config.pixelsPerStrip, @config.numberOfStrips
	fade: (@cb) ->
		@start = new Date().getTime()
		@done = Math.round @config.duration * 1000
		@interval = Math.round 1000.0 / @config.fps
		@timer = setInterval @draw, @interval
		@draw()
	draw: =>
		rgb = @time2color()
		return if !rgb
		framenum = @frame0 ? 0 : 1
		@Ledscape.fillColor framenum, rgb...
		@Ledscape.draw framenum
		@frame0 = !@frame0
	time2color: =>
		elapsed = new Date().getTime() - @start
		if elapsed >= @done
			clearInterval @timer
			@cb()
			return false
		ratio = (1-Math.cos(2*Math.PI*(elapsed*1.0)/(@done*1.0)))/2
		c = @config.color
		[ratio*c[0], ratio*c[1], ratio*c[2]]
		

module.exports = FadeSingle