#!/usr/bin/env sh

VERSION=`node -p -e "require('./package.json').version"`
COMMIT_M=`node -p -e "require('./package.json').commit_m"`

git add --all
git commit -m "V${VERSION} : ${COMMIT_M}"
git push -u