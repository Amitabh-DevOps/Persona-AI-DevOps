# Docker Deployment Guide

This guide explains how to containerize and deploy your React + Vite application using Docker.

## 🐳 Quick Start

### Prerequisites
- Docker installed on your system
- Docker Compose (optional, for easier management)

### Environment Variables
Create a `.env` file in the root directory with your environment variables:
```bash
VITE_GEMINI_API=your_gemini_api_key_here
```

## 🚀 Production Deployment

### Option 1: Using Docker directly

1. **Build the Docker image:**
```bash
docker build -t chai-app .
```

2. **Run the container:**
```bash
docker run -p 3000:80 --env-file .env chai-app
```

Your app will be available at `http://localhost:3000`

### Option 2: Using Docker Compose

1. **Build and run:**
```bash
docker-compose up --build
```

2. **Run in detached mode:**
```bash
docker-compose up -d
```

3. **Stop the application:**
```bash
docker-compose down
```

## 🔧 Development with Docker

For development with hot reloading:

```bash
docker-compose --profile dev up app-dev
```

This will start the development server on `http://localhost:8080` with hot reloading enabled.

## 📦 Docker Hub Deployment

### 1. Tag your image for Docker Hub:
```bash
docker tag chai-app your-dockerhub-username/chai-app:latest
```

### 2. Push to Docker Hub:
```bash
docker push your-dockerhub-username/chai-app:latest
```

### 3. Others can then pull and run your image:
```bash
docker pull your-dockerhub-username/chai-app:latest
docker run -p 3000:80 -e VITE_GEMINI_API=your_api_key your-dockerhub-username/chai-app:latest
```

## 🏗️ Multi-stage Build Explanation

The Dockerfile uses a multi-stage build approach:

1. **deps stage**: Installs only production dependencies
2. **builder stage**: Builds the application using Vite
3. **runner stage**: Serves the built app using Nginx

This approach results in a smaller final image (~50MB) compared to including Node.js in production.

## 🔧 Customization

### Nginx Configuration
The Dockerfile includes an optimized Nginx configuration with:
- SPA routing support (try_files)
- Gzip compression
- Static asset caching
- Security headers

### Environment Variables at Build Time
If you need to pass environment variables at build time:

```bash
docker build --build-arg VITE_GEMINI_API=your_api_key -t chai-app .
```

Then update the Dockerfile to accept build args:
```dockerfile
ARG VITE_GEMINI_API
ENV VITE_GEMINI_API=$VITE_GEMINI_API
```

## 🚨 Security Notes

1. **Never commit `.env` files** with real API keys to version control
2. **Use Docker secrets** or environment variable injection in production
3. **Regularly update base images** for security patches

## 📊 Image Size Optimization

The production image is optimized for size:
- Uses Alpine Linux base images
- Multi-stage build removes build dependencies
- Static assets are served by lightweight Nginx
- Includes `.dockerignore` to exclude unnecessary files

## 🔍 Troubleshooting

### Common Issues:

1. **Port already in use:**
   ```bash
   docker run -p 8080:80 chai-app  # Use different port
   ```

2. **Environment variables not working:**
   - Ensure `.env` file exists and is properly formatted
   - Check that variables start with `VITE_` prefix

3. **Build fails:**
   - Check Docker daemon is running
   - Ensure sufficient disk space
   - Try `docker system prune` to clean up

### Logs:
```bash
docker logs <container-id>
docker-compose logs app
```

## 🌐 Production Deployment Platforms

This Docker setup works with:
- **AWS ECS/Fargate**
- **Google Cloud Run**
- **Azure Container Instances**
- **DigitalOcean App Platform**
- **Heroku Container Registry**
- **Railway**
- **Render**

Each platform may have specific requirements for environment variable handling and port configuration.