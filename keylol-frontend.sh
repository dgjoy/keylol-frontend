#!/bin/bash
ACTION=${1-start}
case ${ACTION} in
  build)
    GULP_TASK_NAME=${2-dev}
    COPY_TARGET=${COPY_TARGET-./build}
    ./node_modules/.bin/gulp --gulpfile gulpfile.js ${GULP_TASK_NAME}
    rm -rf ${COPY_TARGET}/*
    case ${GULP_TASK_NAME} in
      dev)
        cp -rf node_modules ${COPY_TARGET}/
        cp -rf assets ${COPY_TARGET}/
        cp -rf components ${COPY_TARGET}/
        cp -f keylol-app.js ${COPY_TARGET}/
        cp -f root-controller.js ${COPY_TARGET}/
        cp -f environment-config.js ${COPY_TARGET}/
        cp -f user_agreement.pdf ${COPY_TARGET}/
        cp -f index.html ${COPY_TARGET}/
        ;;
      prod)
        cp -rf assets ${COPY_TARGET}/
        cp -rf bundles ${COPY_TARGET}/
        cp -f index.html ${COPY_TARGET}/
        cp -f user_agreement.pdf ${COPY_TARGET}/
        rm -rf ${COPY_TARGET}/assets/stylesheets
        rm -f ${COPY_TARGET}/assets/fonts/keylol-rail-sung-full.ttf
        rm -f ${COPY_TARGET}/assets/fonts/lisong-full.ttf
        rm -f ${COPY_TARGET}/assets/fonts/myriadpro-regular-full.woff
        ;;
    esac
    ;;
  start)
    nginx -g 'daemon off;'
    ;;
esac
