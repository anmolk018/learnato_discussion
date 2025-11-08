# 1) Build Stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package.json & package-lock.json if present
COPY package*.json ./

# Install dependencies (use npm install, not npm ci)
RUN npm install

# Copy all source
COPY . .

# Build production assets
RUN npm run build

# 2) Deploy Stage (Served by NGINX)
FROM nginx:alpine

# Copy build output to NGINX web root
COPY --from=build /app/dist /usr/share/nginx/html

# Expose frontend port (mapped to host)
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
