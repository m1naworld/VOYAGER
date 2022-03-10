FROM nginx
LABEL contributers="Team Harbor"
LABEL version="1.0"

RUN mkdir /etc/live
RUN mkdir /app
WORKDIR /app

COPY ./build ./build
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf

COPY live/. /etc/live/.


EXPOSE 80
EXPOSE 443

RUN npm i -g npm@8.3.0
CMD ["nginx","-g","daemon off;"]
