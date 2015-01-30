// Generated by CoffeeScript 1.8.0

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
  var FullCircle,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  FullCircle = (function() {
    FullCircle.prototype.config = {
      pixelsPerStrip: 64,
      numberOfStrips: 48,
      duration: 10,
      colors: [[255, 0, 0], [128, 0, 0]],
      brightness: 0.75
    };

    function FullCircle(opts) {
      this.draw = __bind(this.draw, this);
      var key, val;
      for (key in opts) {
        val = opts[key];
        this.config[key] = val;
      }
      this.Ledscape = require("../ledscape");
      this.frame0 = true;
      this.Ledscape.init(this.config.pixelsPerStrip, this.config.numberOfStrips);
    }

    FullCircle.prototype.rotate = function() {
      this.offset = 0;
      this.interval = Math.round(1000 / this.config.pixelsPerStrip);
      this.timer = setInterval(this.draw, this.interval);
      return this.draw();
    };

    FullCircle.prototype.draw = function() {
      var framenum, _ref, _ref1, _ref2, _ref3;
      this.offset = this.offset + 1;
      framenum = (_ref = this.frame0) != null ? _ref : {
        0: 1
      };
      (_ref1 = this.Ledscape).fillRangeNoWait.apply(_ref1, [framenum, this.offset, this.config.pixelsPerStrip / 2].concat(__slice.call(this.config.colors[0])));
      (_ref2 = this.Ledscape).fillRangeNoWait.apply(_ref2, [framenum, (this.config.pixelsPerStrip / 2) + this.offset, this.config.pixelsPerStrip / 2].concat(__slice.call(this.config.colors[1])));
      (_ref3 = this.Ledscape).fillRange.apply(_ref3, [framenum, 0, this.offset].concat(__slice.call(this.config.colors[1])));
      this.Ledscape.draw(framenum);
      return this.frame0 = !this.frame0;
    };

    return FullCircle;

  })();

  module.exports = FullCircle;

}).call(this);
