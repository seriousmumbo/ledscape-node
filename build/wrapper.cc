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

extern "C" {
  #include "ledscape/ledscape.h"
}

//#include "ledscape/ledscape.h"

#include <node.h>
#include <v8.h>
#include <inttypes.h>

using namespace v8;

unsigned int num_pixels = 64;
unsigned int num_strips = 48;

ledscape_t * leds;

Handle<Value> LedscapeInit(const Arguments& args) {
  HandleScope scope;
  num_pixels = args[0]->NumberValue();
  num_strips = args[1]->NumberValue();
  leds = ledscape_init(num_pixels);
  return scope.Close(Undefined());
}

Handle<Value> LedscapeDraw(const Arguments& args) {
  HandleScope scope;
  unsigned int frame = args[0]->NumberValue();
  ledscape_draw(leds, frame);
  return v8::Boolean::New(true);
}

static Handle<Value> LedscapeClose(const Arguments& args) {
  HandleScope scope;
  ledscape_close(leds);
  return v8::Boolean::New(true);
}

static Handle<Value> LedscapeFillColor(const Arguments& args) {
  HandleScope scope;
  const unsigned frame_num = args[0]->NumberValue();
  const uint8_t r = args[1]->NumberValue();
  const uint8_t g = args[2]->NumberValue();
  const uint8_t b = args[3]->NumberValue();
  ledscape_frame_t * const frame = ledscape_frame(leds, frame_num);
  for(unsigned i=0; i < num_pixels; i++) {
    for(unsigned strip=0; strip < num_strips; strip++) {
      ledscape_set_color(frame, strip, i, r, g, b);
    }
  }
  ledscape_wait(leds);
  return v8::Boolean::New(true);
}

static Handle<Value> LedscapeFillColorNoWait(const Arguments& args) {
  HandleScope scope;
  const unsigned frame_num = args[0]->NumberValue();
  const uint8_t r = args[1]->NumberValue();
  const uint8_t g = args[2]->NumberValue();
  const uint8_t b = args[3]->NumberValue();
  ledscape_frame_t * const frame = ledscape_frame(leds, frame_num);
  for(unsigned i=0; i < num_pixels; i++) {
    for(unsigned strip=0; strip < num_strips; strip++) {
      ledscape_set_color(frame, strip, i, r, g, b);
    }
  }
  return v8::Boolean::New(true);
}

static Handle<Value> LedscapeFillRange(const Arguments& args) {
  HandleScope scope;
  const unsigned frame_num = args[0]->NumberValue();
  const unsigned start = args[1]->NumberValue();
  const unsigned length = args[2]->NumberValue();
  const uint8_t r = args[3]->NumberValue();
  const uint8_t g = args[4]->NumberValue();
  const uint8_t b = args[5]->NumberValue();
  ledscape_frame_t * const frame = ledscape_frame(leds, frame_num);
  for(unsigned i=start; i < length; i++) {
    for(unsigned strip=0; strip < num_strips; strip++) {
      ledscape_set_color(frame, strip, i, r, g, b);
    }
  }
  ledscape_wait(leds);
  return v8::Boolean::New(true);
}

static Handle<Value> LedscapeFillRangeNoWait(const Arguments& args) {
  HandleScope scope;
  const unsigned frame_num = args[0]->NumberValue();
  const unsigned start = args[1]->NumberValue();
  const unsigned length = args[2]->NumberValue();
  const uint8_t r = args[3]->NumberValue();
  const uint8_t g = args[4]->NumberValue();
  const uint8_t b = args[5]->NumberValue();
  ledscape_frame_t * const frame = ledscape_frame(leds, frame_num);
  for(unsigned i=start; i < length; i++) {
    for(unsigned strip=0; strip < num_strips; strip++) {
      ledscape_set_color(frame, strip, i, r, g, b);
    }
  }
  return v8::Boolean::New(true);
}

static Handle<Value> LedscapeSetColor(const Arguments& args) {
  HandleScope scope;
  const unsigned frame_num = args[0]->NumberValue();
  const unsigned pixel_num = args[1]->NumberValue();
  const uint8_t r = args[2]->NumberValue();
  const uint8_t g = args[3]->NumberValue();
  const uint8_t b = args[4]->NumberValue();
  ledscape_frame_t * const frame = ledscape_frame(leds, frame_num);
  for(unsigned strip=0; strip < num_strips; strip++) {
    ledscape_set_color(frame, strip, pixel_num, r, g, b);
  }
  ledscape_wait(leds);
  return v8::Boolean::New(true);
}

static Handle<Value> LedscapeSetColorNoWait(const Arguments& args) {
  HandleScope scope;
  const unsigned frame_num = args[0]->NumberValue();
  const unsigned pixel_num = args[1]->NumberValue();
  const uint8_t r = args[2]->NumberValue();
  const uint8_t g = args[3]->NumberValue();
  const uint8_t b = args[4]->NumberValue();
  ledscape_frame_t * const frame = ledscape_frame(leds, frame_num);
  for(unsigned strip=0; strip < num_strips; strip++) {
    ledscape_set_color(frame, strip, pixel_num, r, g, b);
  }
  return v8::Boolean::New(true);
}

static Handle<Value> LedscapeSetColorStrip(const Arguments& args) {
  HandleScope scope;
  const unsigned frame_num = args[0]->NumberValue();
  const unsigned strip_num = args[1]->NumberValue();
  const unsigned pixel_num = args[2]->NumberValue();
  const uint8_t r = args[3]->NumberValue();
  const uint8_t g = args[4]->NumberValue();
  const uint8_t b = args[5]->NumberValue();
  ledscape_frame_t * const frame = ledscape_frame(leds, frame_num);
  ledscape_set_color(frame, strip_num, pixel_num, r, g, b);
  ledscape_wait(leds);
  return v8::Boolean::New(true);
}

static Handle<Value> LedscapeSetColorStripNoWait(const Arguments& args) {
  HandleScope scope;
  const unsigned frame_num = args[0]->NumberValue();
  const unsigned strip_num = args[1]->NumberValue();
  const unsigned pixel_num = args[2]->NumberValue();
  const uint8_t r = args[3]->NumberValue();
  const uint8_t g = args[4]->NumberValue();
  const uint8_t b = args[5]->NumberValue();
  ledscape_frame_t * const frame = ledscape_frame(leds, frame_num);
  ledscape_set_color(frame, strip_num, pixel_num, r, g, b);
  return v8::Boolean::New(true);
}

void InitAll(Handle<Object> exports, Handle<Object> module) {
   exports->Set(String::NewSymbol("init"),
     FunctionTemplate::New(LedscapeInit)->GetFunction());
   exports->Set(String::NewSymbol("draw"),
     FunctionTemplate::New(LedscapeDraw)->GetFunction()); 
   exports->Set(String::NewSymbol("fillColor"),
     FunctionTemplate::New(LedscapeFillColor)->GetFunction());
   exports->Set(String::NewSymbol("fillColorNoWait"),
     FunctionTemplate::New(LedscapeFillColorNoWait)->GetFunction());
   exports->Set(String::NewSymbol("fillRange"),
     FunctionTemplate::New(LedscapeFillRange)->GetFunction());
   exports->Set(String::NewSymbol("fillRangeNoWait"),
     FunctionTemplate::New(LedscapeFillRangeNoWait)->GetFunction());
   exports->Set(String::NewSymbol("setColor"),
     FunctionTemplate::New(LedscapeSetColor)->GetFunction());
   exports->Set(String::NewSymbol("setColorNoWait"),
     FunctionTemplate::New(LedscapeSetColorNoWait)->GetFunction());
   exports->Set(String::NewSymbol("close"),
     FunctionTemplate::New(LedscapeClose)->GetFunction());
}

NODE_MODULE(wrapper, InitAll)
