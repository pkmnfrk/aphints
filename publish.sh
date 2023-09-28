#!/bin/bash

cd dist
aws s3 sync --exclude "*.html" --cache-control "public, max-age=604800, immutable" --delete . s3://mcaron-aphints-website
aws s3 sync --include "*.html" --cache-control no-cache --content-type text/html --delete . s3://mcaron-aphints-website
cd ..