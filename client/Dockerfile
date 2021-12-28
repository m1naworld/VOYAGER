FROM nginx
LABEL contributers="Team Harbor"
LABEL version="1.0"

RUN mkdir /app
WORKDIR /app

COPY ./build ./build
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY /etc/live/ /etc/live
EXPOSE 80
EXPOSE 443

CMD ["nginx","-g","daemon off;"]
