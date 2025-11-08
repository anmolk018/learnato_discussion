# ---- build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript → dist/
RUN npm run build


# ---- runtime stage ----
FROM node:20-alpine AS runner
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy compiled build output
COPY --from=builder /app/dist ./dist

# Copy data directory (if needed for LowDB)
COPY --from=builder /app/data ./data

# Expose backend port
EXPOSE 4000

# Start server
CMD ["node", "dist/index.js"]
