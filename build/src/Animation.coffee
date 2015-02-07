ledscape = require "../ledscape"
color = require "color"

numpixels = 24

class Animation
  config:
    fps: 100
    duration: 20
    repeat: false
    brightness: 0.4

  constructor: (opts) ->
    for key, val of opts
      @config[key] = val
    @frame = 0
    @pixels = []
    @done = Math.round @config.duration * 1000
    @interval = Math.round 1000.0 / @config.fps
 
  play: (@cb) =>
    @frame = 0
    @go()

  go: =>
    @start = new Date().getTime()
    @timer = setInterval @drawFrame, @interval
    @drawFrame()

  checkDone: =>
    if @config.repeat
      @play()
    else
      clearInterval @timer
      @clear()
      @cb()

  clear: =>
    @fill color("black")
    @ledsOut()

  ledsOut: =>
    for p in [0..numpixels-2]
      rgb = @pixels[p].rgb()
      ledscape.setColorNoWait @frame, p, rgb.r, rgb.g, rgb.b
    clr = @pixels[numpixels-1].rgb()
    ledscape.setColor @frame, numpixels-1, clr.r, clr.g, clr.b
    ledscape.draw @frame
    if @frame is 0 then @frame = 1 else @frame = 0

  drawFrame: =>
    elapsed = new Date().getTime()-@start
    if elapsed >= @done
      @checkDone()
    @draw elapsed
    @ledsOut()

  pause: =>
    clearInterval @timer
    
  resume: =>
    @go()

  pixel: (n, color) =>
    @pixels[n] = color
 
  fill: (color) =>
    for p in [0..numpixels-1]
      @pixel n, color


module.exports = Animation
