#!/bin/bash
if [ -z "$API_ENDPOINT" ]; then
  echo "Use default API endpoint: https://api.keylol.com/"
else
  OLD=$(echo 'https://api.keylol.com/' | sed -e 's/[]\/$*.^|[]/\\&/g')
  NEW=$(echo $API_ENDPOINT | sed -e 's/[]\/$*.^|[]/\\&/g')
  sed -i 's/'"$OLD"'/'"$NEW"'/g' /usr/share/nginx/html/bundles/app-*.js
  echo "Use API endpoint: $API_ENDPOINT"
fi
nginx
cd /prerender
node server.js
