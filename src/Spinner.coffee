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

class Spinner
	config:
		cycleLength: 2 # seconds
		cycleCenterDivider: 4 # Move the center every x cycles (doesn't go this fast in reality)
		totalSize: 24 # LEDs
		numberOfStrips: 1
		points: 1 # (hop between each LED)
		backgroundColor: [0,0,0]
		color: [255,255,255]
		fps: 100
	constructor: (opts) ->
		for key, val of opts
			@config[key] = val
		@Ledscape = require "../ledscape"
		@frame0 = true # is frame 0
		@Ledscape.init @config.totalSize, @config.numberOfStrips
	spin: ->
		@start = new Date().getTime()
		@Ledscape.fillColor 0, @config.backgroundColor...
		@Ledscape.draw 0
		@interval = Math.floor 1000 * (1 / @config.fps)
		@timer = setInterval @draw, @interval
	draw: =>
		if @frame0
			@drawFrame()
		@frame0 = !@frame0
		framenum = @frame0 ? 0 : 1
		@Ledscape.draw framenum
	drawFrame: ->
		@Ledscape.fillColorNoWait 1, @config.backgroundColor...
		@Ledscape.setColorNoWait 1, 1, @position(@config.cycleLength), @config.color...
		@Ledscape.setColorNoWait 1, 1, @position(@config.cycleLength / 8), @config.color...
		@Ledscape.setColor 1, 1, @position(@config.cycleLength / 4), @config.color...
	position: (offset) ->
		cycleTick = @millis() + (offset * 1000) + (@center()) % @cycleLengthMillis()
		portionOfCycle = cycleTick / @cycleLengthMillis()
		totalRadiansPerCycle = Math.PI / 2
		radianPosition = portionOfCycle * totalRadiansPerCycle
		linearPosition = Math.sin radianPosition
		positionMultiplier = @config.totalSize
		position = linearPosition * positionMultiplier
		Math.floor(position/@config.points)*@config.points
	center: ->
		return (@millis() / @config.centerCycleDivider) % @cycleLengthMillis()
		# (@configcycleLength / 3) * 1000
	millis: ->
		new Date().getTime() - @start
	cycleLengthMillis: ->
		@config.cycleLength * 1000

module.exports = Spinner