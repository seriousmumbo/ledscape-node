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
		@dir = if opts.rom > opts.to then -1 else 1
		@interval = Math.round 1000.0 / @config.fps
		@timer = setInterval draw, interval
		@draw()
	draw: =>
		color = @time2color()
		return @cb() if !color
		framenum = @frame0 ? 0 : 1
		@Ledscape.fillColor framenum, rgb...
		@Ledscape.draw framenum
		@frame0 = !@frame0
	time2color: =>
		elapsed = new Date().getTime() - @start
		color = new @Color '22ff66'
		if elapsed >= @done
			clearInterval @timer
			return false
		@ratio = (elapsed*1.0)/(@done*1.0)
		color = color.rotate(180.0*ratio)
		color = color.saturate(ratio)
		color = color.whiten(ratio)
		color.rbgArray()

module.exports = AllFade