FROM nginx
LABEL contributers="Team Harbor"
LABEL version="1.0"

# # Working Directory 지정
RUN mkdir /app
WORKDIR /app

COPY ./build ./build
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

