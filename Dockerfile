FROM node:24

# Set working directory
WORKDIR /app

# Install NestJS CLI globally
RUN npm i -g @nestjs/cli
