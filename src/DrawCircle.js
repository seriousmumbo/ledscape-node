// Generated by CoffeeScript 1.9.0

/*
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
 */

(function() {
  var DrawCircle,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  DrawCircle = (function() {
    DrawCircle.prototype.config = {
      pixelsPerStrip: 64,
      numberOfStrips: 48,
      duration: 10,
      colors: [[255, 0, 0], [128, 0, 0]],
      startColor: [0, 0, 0],
      brightness: 0.75
    };

    function DrawCircle(opts) {
      this.draw = __bind(this.draw, this);
      var key, val;
      for (key in opts) {
        val = opts[key];
        this.config[key] = val;
      }
      this.Ledscape = require("../ledscape");
      this.Ledscape.init(this.config.pixelsPerStrip, this.config.numberOfStrips);
    }

    DrawCircle.prototype.rotate = function() {
      this.offset = 0;
      this.interval = Math.round(1000 / this.config.pixelsPerStrip);
      this.Ledscape.fillColorNoWait(0, this.config.startColor);
      this.timer = setInterval(this.draw, this.interval);
      return this.draw();
    };

    DrawCircle.prototype.draw = function() {
      var _ref, _ref1;
      this.offset++;
      (_ref = this.Ledscape).setColorNoWait.apply(_ref, [0, this.offset % this.config.pixelsPerStrip].concat(__slice.call(this.config.colors[0])));
      (_ref1 = this.Ledscape).setColor.apply(_ref1, [0, ((this.config.pixelsPerStrip / 2) + this.offset) % this.config.pixelsPerStrip].concat(__slice.call(this.config.colors[1])));
      return this.Ledscape.draw(0);
    };

    return DrawCircle;

  })();

  module.exports = DrawCircle;

}).call(this);