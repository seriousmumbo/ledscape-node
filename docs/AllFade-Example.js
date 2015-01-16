/*
 * AllFade Animation
 * Simply fades from one color brightness to another.
 * This is a commented version of the output from CoffeeScript,
 * so some blocks were optimized to be efficent and not readable, and have been rewritten.
*/

/*
 * Variable definitions
 * Bind and slice are added to allow methods to be passed as callbacks.
*/
var AllFade,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __slice = [].slice;

AllFade = (function() {
  /*
   * AllFade uses various variables to keep track of the state.
   * `pixelsPerStrip` and `numberOfStrips` are used to track
   * the physical details we are working with.
   * In other animations, `fps` defines a minimum refresh rate when determining
   * how often the animation will change when a pixel is rotating through all LEDs,
   * however we just get a fractional form and always meet the FPS given.
   * `from` and `to` define the brightness to transition between.
   * The `duration` defines how many seconds the animation should last.
   */
  AllFade.prototype.config = {
    pixelsPerStrip: 64,
    numberOfStrips: 48,
    fps: 100,
    from: 0,
    to: 255,
    duration: 0.65
  };

  /**
   * The constructor sets up the necessary local variables and connections,
   * manages the arguments, and starts the animation through the Ledscape library.
   * After being constructed, `this.fade` will be called by the client
   * to trigger the animation to start.
   */
  function AllFade(opts) {
    // We bind a few parameters so they can be used as callbacks.
    this.time2color = __bind(this.time2color, this);
    this.draw = __bind(this.draw, this);
    // We loop through an array of options passed in the constructor to
    // change configuration details.
    var key, val;
    for (key in opts) {
      val = opts[key];
      this.config[key] = val;
    }
    // We add a call to the main Ledscape class
    // (compiled from src/ledscape.coffee and extending the C++ wrapper)
    // and get a copy of the Color library which is already fetched through NPM in Ledscape.
    this.Ledscape = require("../ledscape");
    this.Color = this.Ledscape.color();
    // Frame0 will be used to alternate frames to animate.
    this.frame0 = true;
    // We finish with a call to a C++ function through the Ledscape wrapper to initialize
    // the LEDs to be ready to animate.
    this.Ledscape.init(this.config.pixelsPerStrip, this.config.numberOfStrips);
  }

  /*
   * `this.fade` is the main trigger called when the client is ready to start an animation.
   * We calculate the range and direction the color is moving in, and calculate the time
   * to set an interval to callback `this.draw`.
  */
  AllFade.prototype.fade = function(cb) {
    // We take a callback as a parameter to call when the animation is over.
    this.cb = cb;
    // We calculate the start time to determine duration later
    this.start = new Date().getTime();
    this.done = Math.round(this.config.duration * 1000);  // Round up millisec to secs
    // Determine the total hue change (absolute value)
    this.range = Math.abs(this.config.to - this.config.from);
    // Determine whether we are increasing or decreasing (to be used as a multiplier)
    this.dir = this.config.from > this.config.to ? -1 : 1;
    // Simple FPS to millisecond conversion
    this.interval = Math.round(1000.0 / this.config.fps);
    // Set an interval to call this.draw.
    this.timer = setInterval(this.draw, this.interval);
    // Start the animation off by drawing the first frame.
    return this.draw();
  };

  /*
   * `this.draw` is called to display each frame of the animation.
   * Fetches the colors, determines which frame to draw on, and writes out the colors.
   * For other animations, you could use different methods and functions to get the colors to write
   * to the LEDs, and call the fillColor or other routines to draw the pixels through Ledscape.
  */
  AllFade.prototype.draw = function() {
    var framenum, rgb, _ref, _ref1;
    /*
     * Fetches the current color with `this.time2color`, and returns the callback
     * this.cb() if no color is returned, meaning the animation is done and
     * the interval timer is turned off.
    */
    rgb = this.time2color();
    if (!rgb) {
      return this.cb();
    }
    // Cleaner in coffeescript as `framenum = @frame0 ? 0 : 1`.  Finds whether we are dealing
    // with frame 0 or 1.
    framenum = (_ref = this.frame0) != null ? _ref : {
      0: 1
    };
    // Again cleaner in coffeescript.  `@Ledscape.fillColor framenum, rgb...` is a shortcut for
    // `this.Ledscape.fillColor(framenum, rgb[0], rgb[1], rgb[2]);` to fill all the LEDs with
    // the current color returned by `this.time2color()`.
    (_ref1 = this.Ledscape).fillColor.apply(_ref1, [framenum].concat(__slice.call(rgb)));
    // Switch frames to draw out the current frame
    this.Ledscape.draw(framenum);
    // Switch the current frame so the other frame is drawn next.
    return this.frame0 = !this.frame0;
  };

  /*
   * this.time2color parses the offset for the current time, and returns the RGB values
   * that should be written to the LEDs.
   * This function is only needed for this particular scenario.
  */
  AllFade.prototype.time2color = function() {
    var color, elapsed, ratio;
    // Find the time that has gone by since starting the animation.
    elapsed = new Date().getTime() - this.start;
    // Use a base color to fade.
    color = new this.Color('#22ff66');
    // First check to see if the animation is over, in which case we can stop the timer
    // and return false so `this.cb()` is triggered. 
    if (elapsed >= this.done) {
      clearInterval(this.timer);
      return false;
    }
    // Find the ratio to use for setting the color
    ratio = (elapsed * 1.0) / (this.done * 1.0);
    // Use a one-liner to set the brightness
    color.rotate(180.0 * ratio).saturate(ratio).whiten(ratio);
    // Return an RGB array from the Color library of the current values for the color
    return color.rgbArray();
  };

  return AllFade;

})();

module.exports = AllFade;