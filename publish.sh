#!/bin/bash

cd dist
cp ../public/favicon.png .
aws s3 sync --exclude "*.html" --cache-control "public, max-age=604800, immutable" . s3://mcaron-aphints-website
aws s3 sync --include "*.html" --cache-control no-cache --content-type text/html . s3://mcaron-aphints-website
cd ..