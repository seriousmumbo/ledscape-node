wrapper = require "./build/Release/wrapper"
module.exports = wrapper
module.exports.color = ->
	require "color"
module.exports.anim = (anim) ->
	require "./anim/#{anim}"