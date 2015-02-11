class FadeNew
	config:
		pixelsPerStrip: 64
		numberOfStrips: 48
		fps: 40
		duration: 65
		color: [255,255,255]
		brightness: 0.5
	constructor: (opts) ->
		for key, val of opts
			@config[key] = val
		@Ledscape = require "../ledscape"
		@frame0 = true # is frame 0
		@Ledscape.init @config.pixelsPerStrip, @config.numberOfStrips
	fade: (@cb) ->
		@strip = 0
		@pixel = 0
		@start = new Date().getTime()
		@done = Math.round @config.duration * 1000
		@interval = Math.round 1000.0 / @config.fps
		@timer = setInterval @draw, @interval
		@draw()
	draw: =>
		rgb = @time2color()
		return if !rgb
		framenum = @frame0 ? 0 : 1
		
		@pixel += 1
		if @pixel is 24 
			@pixel = 0
		@Ledscape.fillColorNoWait 0, 0,0,0
		@Ledscape.setColorNoWait 0, @pixel, 0,100,0
		@Ledscape.setColorNoWait 0, @pixel+1, 0,120,0
		@Ledscape.setColor 0, @pixel+2, 0,140,0
		@Ledscape.draw 0
		@frame0 = !@frame0
	time2color: =>
		elapsed = new Date().getTime() - @start
		if elapsed >= @done
			clearInterval @timer
			@cb()
			return false
		ratio = (1-Math.cos(2*Math.PI*(elapsed*1.0)/(@done*1.0)))/2
		c = @config.color
		[ratio*c[0]*@config.brightness, ratio*c[1]*@config.brightness, ratio*c[2]*@config.brightness]
		

module.exports = FadeNew
