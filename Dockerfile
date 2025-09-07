# Use Node.js 18 Alpine as base image for smaller size
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci

# Production image, use Node.js to serve with runtime env vars
FROM base AS runner
WORKDIR /app

# Copy dependencies and source
COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 80

# Build and run with environment variables passed at runtime
CMD sh -c 'npm run build && npm run preview -- --host 0.0.0.0 --port 80' 