.SUFFIXES:

all: build/Resource/wrapper.node ANIMS ledscape.js BIN_FILES

BIN_FILES: ws281x_0.bin ws281x_1.bin ws2801_0.bin ws2801_1.bin ws2801_newpins_0.bin ws2801_newpins_1.bin

ANIMS: anim/AllFade.js anim/Spinner.js anim/FadeSingle.js anim/FullCircle.js

build/Resource/wrapper.node: wrapper.cc
	node-gyp configure build

ledscape.js: src/ledscape.coffee
	node_modules/.bin/coffee -c src/ledscape.coffee
	mv src/ledscape.js ./

anim/AllFade.js: src/AllFade.coffee
	mkdir -p anim/
	node_modules/.bin/coffee -c src/AllFade.coffee
	mv src/AllFade.js anim/

anim/Spinner.js: src/Spinner.coffee
	mkdir -p anim/
	node_modules/.bin/coffee -c src/Spinner.coffee
	mv src/Spinner.js anim/

anim/FadeSingle.js: src/FadeSingle.coffee
	mkdir -p anim/
	node_modules/.bin/coffee -c src/FadeSingle.coffee
	mv src/FadeSingle.js anim/

anim/FullCircle.js: src/FullCircle.coffee
	mkdir -p anim/
	node_modules/.bin/coffee -c src/FullCircle.coffee
	mv src/FullCircle.js anim/

anim/DrawCircle.js: src/DrawCircle.coffee
	mkdir -p anim/
	node_modules/.bin/coffee -c src/DrawCircle.coffee
	mv src/DrawCircle.js anim/

premake:
	git submodule init
	git submodule update
	cp overwrite/interface-makefile ledscape/am335x/app_loader/interface/Makefile
	cd ledscape/am335x/app_loader/interface/; make
	cd ledscape/; make

%.bin: ledscape/%.bin
	cp $< ./

test: all
	node tests/test.js