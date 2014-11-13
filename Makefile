.SUFFIXES:

all: build/Resource/wrapper.node AllFade.js ledscape.js

build/Resource/wrapper.node: wrapper.cc
	node-gyp configure build

ledscape.js: src/ledscape.coffee
	node_modules/.bin/coffee -c src/ledscape.coffee
	mv src/ledscape.js ./

anim/AllFade.js: src/AllFade.coffee
	mkdir -p anim/
	node_modules/.bin/coffee -c AllFade.coffee
	mv src/AllFade.js anim/

premake:
	git submodule init
	git submodule update
	cd ledscape/; make
	cd ledscape/am335x/app_loader/interface/; make

test: all
	node tests/test.js