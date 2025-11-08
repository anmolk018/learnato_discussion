# FROM node:20-alpine
# WORKDIR /app
# COPY package.json package-lock.json* ./
# RUN npm ci --omit=dev
# COPY . .
# EXPOSE 4000
# CMD ["node", "dist/index.js"]

# ---- build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- runtime stage ----
FROM node:20-alpine AS runner
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# copy the built code from builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 4000
CMD ["node", "dist/index.js"]