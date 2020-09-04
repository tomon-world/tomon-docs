#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
echo 'tomon.world' >CNAME

cd -

gh-pages -d docs/.vuepress/dist
