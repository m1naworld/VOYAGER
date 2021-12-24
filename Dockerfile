FROM node:16.13.0
LABEL contributers="Team Harbor"
LABEL version="1.0"

# # Working Directory 지정
WORKDIR /usr/src/app

# # package.json과 package-lock.json 둘다 복사 -> 컨테이너의 ./경로에 COPY 종속성 설치 
# # COPY [현재 로컬에서 가져갈 파일] [컨테이너로 옮길 경로]
COPY package.json ./
COPY package-lock.json ./

# USER node
RUN npm install

COPY ./ ./

CMD ["npm","run","server"]

EXPOSE 4000
