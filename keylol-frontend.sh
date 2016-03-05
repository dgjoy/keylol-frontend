#!/bin/bash
if [ -z "$API_ENDPOINT" ]; then
  OLD=$(echo 'https://api.keylol.com/' | sed -e 's/[]\/$*.^|[]/\\&/g')
  NEW=$(echo $API_ENDPOINT | sed -e 's/[]\/$*.^|[]/\\&/g')
  sed -i 's/'"$OLD"'/'"$NEW"'/g' /usr/share/nginx/html/bundles/app-*.js
  echo "Using API endpoint $API_ENDPOINT ..."
else
  echo "Using default API endpoint ..."
fi
nginx -g daemon off
