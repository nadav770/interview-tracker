# Multi-stage build for Expo React Native app
FROM node:20-alpine

# Install dependencies and tools
RUN apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++ \
    wget \
    curl

WORKDIR /app

# Copy package files first (for better caching)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# Copy source code
COPY . .

# Expose port
EXPOSE 8081

# Set environment variables
ENV NODE_ENV=production
ENV EXPO_PUBLIC_ENV=production
ENV EXPO_USE_FAST_RESOLVER=1

# Start Expo server
CMD ["npx", "expo", "start", "--web", "--port", "8081", "--host", "lan"]

