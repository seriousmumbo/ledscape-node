.SUFFIXES:

all: build/Resource/wrapper.node AllFade.js ledscape.js

build/Resource/wrapper.node: wrapper.cc Ledscape*Wrapper.*
	node-gyp configure build

ledscape.js: src/ledscape.coffee
	coffee -c src/ledscape.coffee
	mv src/ledscape.js ./

anim/AllFade.js: src/AllFade.coffee
	mkdir -p anim/
	coffee -c AllFade.coffee
	mv src/AllFade.js anim/

premake:
	npm install -g coffee-script
	git submodule init
	git submodule update

test: all
	node tests/test.js