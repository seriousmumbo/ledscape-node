#!/bin/bash
mkdir -p build
git submodule init
git submodule update
cp -r ledscape build
rm ledscape/.git
cp *.cc Makefile build
mv *.gyp build
cp -r src build
cp -r overwrite build
export NPMBIN=$(npm bin)
cd build
make premake
make
cd ..

