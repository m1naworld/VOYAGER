docker-compose down
docker rmi `docker images -q`
git pull
docker-compose up --build -d --scale backend=3
docker-compose logs -f
