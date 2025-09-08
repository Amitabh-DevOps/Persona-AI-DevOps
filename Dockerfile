# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Accept build-time variable
ARG VITE_GEMINI_API
ENV VITE_GEMINI_API=$VITE_GEMINI_API

COPY package.json package-lock.json* ./
RUN npm ci
COPY . .

# Build with env variable
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist ./
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
