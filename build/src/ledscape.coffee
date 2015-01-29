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

wrapper = require "./build/Release/wrapper"
module.exports = wrapper

module.exports.color = ->
  require "color"

module.exports.anim = (anim) ->
  bindir = path.resolve __dirname, "../build/ledscape"
  process.chdir bindir
  require "#{__dirname}/anim/#{anim}"
