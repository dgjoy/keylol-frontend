FROM node:5.10.1
MAINTAINER Stackie Jia <stackia@keylol.com>

ENV NGINX_VERSION 1.9.11-1~jessie

RUN apt-key adv --keyserver hkp://pgp.mit.edu:80 --recv-keys 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62 \
  && echo "deb http://nginx.org/packages/mainline/debian/ jessie nginx" >> /etc/apt/sources.list \
  && apt-get update \
  && apt-get install -y ca-certificates nginx=${NGINX_VERSION} gettext-base \
  && rm -rf /var/lib/apt/lists/*

COPY package.json .
RUN NPM_CONFIG_LOGLEVEL=warn npm install

COPY keylol-frontend.sh /usr/local/bin/keylol-frontend
RUN chmod +x /usr/local/bin/keylol-frontend

COPY *.js ./
COPY *.ejs ./
COPY *.pdf ./
COPY components components/
COPY assets assets/

ENV BUILD_TASK prod
ENV BUILD_COPY_TARGET /usr/share/nginx/html
RUN keylol-frontend build ${BUILD_TASK}

COPY nginx-site.conf /etc/nginx/conf.d/default.conf

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log

ENV PRERENDER_AUTHORIZATION "Basic a2V5bG9sOmZvb2Jhcg=="

EXPOSE 80
CMD keylol-frontend start
