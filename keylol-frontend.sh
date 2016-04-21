#!/bin/bash
ACTION=${1-start}
case ${ACTION} in
  build)
    BUILD_TASK=${2-dev}
    BUILD_COPY_TARGET=${BUILD_COPY_TARGET-./build}
    ./node_modules/.bin/gulp --gulpfile gulpfile.js ${BUILD_TASK}
    rm -rf ${BUILD_COPY_TARGET}/*
    case ${BUILD_TASK} in
      dev)
        cp -rf node_modules ${BUILD_COPY_TARGET}/
        cp -rf assets ${BUILD_COPY_TARGET}/
        cp -rf temporary ${BUILD_COPY_TARGET}/
        cp -rf src ${BUILD_COPY_TARGET}/
        cp -f keylol-app.js ${BUILD_COPY_TARGET}/
        cp -f root-controller.js ${BUILD_COPY_TARGET}/
        cp -f user_agreement.pdf ${BUILD_COPY_TARGET}/
        cp -f index.html ${BUILD_COPY_TARGET}/
        ;;
      prod)
        cp -rf assets ${BUILD_COPY_TARGET}/
        cp -rf bundles ${BUILD_COPY_TARGET}/
        cp -rf node_modules/node_modules/simditor/styles/fonts ${BUILD_COPY_TARGET}/
        cp -f index.html ${BUILD_COPY_TARGET}/
        cp -f user_agreement.pdf ${BUILD_COPY_TARGET}/
        rm -rf ${BUILD_COPY_TARGET}/assets/stylesheets
        rm -f ${BUILD_COPY_TARGET}/assets/fonts/keylol-rail-sung-full.ttf
        rm -f ${BUILD_COPY_TARGET}/assets/fonts/lisong-full.ttf
        rm -f ${BUILD_COPY_TARGET}/assets/fonts/myriadpro-regular-full.woff
        rm -f ${BUILD_COPY_TARGET}/assets/fonts/keylol.manifest.json
        rm -f ${BUILD_COPY_TARGET}/assets/fonts/lisong.manifest.json
        rm -rf ${BUILD_COPY_TARGET}/scss
        ;;
    esac
    ;;
  start)
    if [ ! -f /rebuild.lock ] && [ ${BUILD_TASK} != 'prod' ]; then
      keylol-frontend build ${BUILD_TASK}
      touch /rebuild.lock
    fi
    PRERENDER_AUTHORIZATION=$(echo ${PRERENDER_AUTHORIZATION} | sed -e 's/[]\/$*.^|[]/\\&/g')
    sed -i 's/__PRERENDER_AUTHORIZATION__/'"${PRERENDER_AUTHORIZATION}"'/g' /etc/nginx/conf.d/default.conf
    nginx -g 'daemon off;'
    ;;
esac
