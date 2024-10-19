# Stage 1: Build the Next.js app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Serve the app with a minimal environment
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy build output from the builder stage
COPY --from=builder /app ./

# Install only production dependencies
RUN npm install --production

# Expose the port that the app will run on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
