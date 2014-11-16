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

class FullCircle
	config:
		pixelsPerStrip: 64
		numberOfStrips: 48
		duration: 10
		colors: [[255,0,0],[128,0,0]]
		brightness: 0.75
	constructor: (opts) ->
		for key, val of opts
			@config[key] = val
		@Ledscape = require "../ledscape"
		@frame0 = true # is frame 0
		@Ledscape.init @config.pixelsPerStrip, @config.numberOfStrips
	rotate: ->
		@offset = 0
		@interval = Math.round 1000.0 / @config.fps
		@timer = setInterval @draw, @interval
		@draw()
	draw: =>
		@offset = (@offset + 1) % @config.pixelsPerStrip
		framenum = @frame0 ? 0 : 1
		@Ledscape.fillRangeNoWait framenum, @offset, (@config.pixelsPerStrip/2), @config.color[0]...
		@Ledscape.fillRange framenum, (@config.pixelsPerStrip/2)+offset, (@config.pixelsPerStrip/2), @config.color[1]...
		@Ledscape.fillRange framenum, 0, offset, @config.color[1]...
		@Ledscape.draw framenum
		@frame0 = !@frame0

module.exports = FullCircle