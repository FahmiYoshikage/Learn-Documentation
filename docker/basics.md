# Perintah Dasar Docker

## Image Commands

```bash
# List images
docker images

# Pull image from Docker Hub
docker pull nginx:latest

# Remove image
docker rmi nginx:latest

# Build image from Dockerfile
docker build -t myapp:latest .

# Tag image
docker tag myapp:latest myapp:v1.0
```

## Container Commands

### Running Containers

```bash
# Run container
docker run nginx

# Run in detached mode (background)
docker run -d nginx

# Run with name
docker run -d --name my-nginx nginx

# Run with port mapping
docker run -d -p 8080:80 nginx

# Run with environment variables
docker run -d -e KEY=value nginx

# Run with volume mount
docker run -d -v /host/path:/container/path nginx
```

### Managing Containers

```bash
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Stop container
docker stop my-nginx

# Start stopped container
docker start my-nginx

# Restart container
docker restart my-nginx

# Remove container
docker rm my-nginx

# Remove running container (force)
docker rm -f my-nginx
```

## Logs & Debugging

```bash
# View logs
docker logs my-nginx

# Follow logs (real-time)
docker logs -f my-nginx

# Last 100 lines
docker logs --tail 100 my-nginx

# Execute command in running container
docker exec my-nginx ls /usr/share/nginx/html

# Interactive shell
docker exec -it my-nginx bash

# Inspect container
docker inspect my-nginx

# Container stats
docker stats my-nginx
```

## Cleanup

```bash
# Remove all stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove unused volumes
docker volume prune

# Remove everything unused
docker system prune

# Remove everything (including used)
docker system prune -a
```

## Network

```bash
# List networks
docker network ls

# Create network
docker network create mynetwork

# Run container on specific network
docker run -d --network mynetwork --name app nginx

# Inspect network
docker network inspect mynetwork
```

## Volume

```bash
# List volumes
docker volume ls

# Create volume
docker volume create myvolume

# Use volume
docker run -d -v myvolume:/data nginx

# Inspect volume
docker volume inspect myvolume

# Remove volume
docker volume rm myvolume
```

## Useful Combinations

### Run Web Server

```bash
# Nginx with custom HTML
docker run -d \
  --name my-web \
  -p 8080:80 \
  -v $(pwd)/html:/usr/share/nginx/html \
  nginx:latest
```

### Run Database

```bash
# PostgreSQL
docker run -d \
  --name my-postgres \
  -e POSTGRES_PASSWORD=secret \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  -v postgres-data:/var/lib/postgresql/data \
  postgres:15
```

### Run Node.js App

```bash
docker run -d \
  --name my-app \
  -p 3000:3000 \
  -v $(pwd):/app \
  -w /app \
  node:18 \
  npm start
```

::: tip Quick Tip
Gunakan `docker run --rm` untuk auto-remove container setelah stop!
:::
