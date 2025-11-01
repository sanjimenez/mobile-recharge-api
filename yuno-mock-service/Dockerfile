# =========================================
# Stage 1: Build the NestJS app
# =========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy source code
COPY .. .

# Build the NestJS project
RUN npm run build


# =========================================
# Stage 2: Run the built app
# =========================================
FROM node:20-alpine

WORKDIR /app

# Copy only the dist and package files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Install only production dependencies
RUN npm install --only=production

# Expose default NestJS port
EXPOSE 3001

# Run the app
CMD ["node", "dist/main.js"]