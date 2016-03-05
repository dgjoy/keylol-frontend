FROM node:4.3.2
MAINTAINER Stackie Jia <stackia@keylol.com>

ENV NGINX_VERSION 1.9.11-1~jessie

RUN apt-key adv --keyserver hkp://pgp.mit.edu:80 --recv-keys 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62 \
  && echo "deb http://nginx.org/packages/mainline/debian/ jessie nginx" >> /etc/apt/sources.list \
  && apt-get update \
  && apt-get install -y ca-certificates nginx=${NGINX_VERSION} gettext-base \
  && rm -rf /var/lib/apt/lists/*

ENV NPM_CONFIG_LOGLEVEL warn

COPY package.json .
RUN npm install

COPY *.js ./
COPY *.ejs ./
COPY components components/
COPY assets assets/

ENV COPY_TARGET /usr/share/nginx/html
RUN ./node_modules/.bin/gulp --gulpfile gulpfile.js prod \
  && rm -rf ${COPY_TARGET}/* \
  && cp -rf assets ${COPY_TARGET}/ \
  && cp -rf bundles ${COPY_TARGET}/ \
  && cp -f index.html ${COPY_TARGET}/ \
  && rm -rf ${COPY_TARGET}/assets/stylesheets \
  && rm -f ${COPY_TARGET}/assets/fonts/keylol-rail-sung-full.ttf \
  && rm -f ${COPY_TARGET}/assets/fonts/lisong-full.ttf \
  && rm -f ${COPY_TARGET}/assets/fonts/myriadpro-regular-full.woff

COPY nginx-site.conf /etc/nginx/conf.d/default.conf

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]