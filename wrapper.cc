/*
 * wrapper.cc
 *
 *  Created on: Oct 14, 2014
 *      Author: lenny
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
  printf("nodeledscape draw frame %d\n", frame);
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
  printf("nodeledscape fillcolor %d %d %d ", r,g,b);
  ledscape_frame_t * const frame = ledscape_frame(leds, frame_num);
  for(unsigned i=0; i < num_pixels; i++) {
    for(unsigned strip=0; strip < num_strips; strip++) {
      ledscape_set_color(frame, strip, i, r, g, b);
    }
  }
  ledscape_wait(leds);
  return v8::Boolean::New(true);
}

void InitAll(Handle<Object> exports, Handle<Object> module) {
   exports->Set(String::NewSymbol("init"),
     FunctionTemplate::New(LedscapeInit)->GetFunction());
   exports->Set(String::NewSymbol("draw"),
     FunctionTemplate::New(LedscapeDraw)->GetFunction()); 
   exports->Set(String::NewSymbol("fillColor"),
     FunctionTemplate::New(LedscapeFillColor)->GetFunction());
   exports->Set(String::NewSymbol("close"),
     FunctionTemplate::New(LedscapeClose)->GetFunction());
}

NODE_MODULE(wrapper, InitAll)
