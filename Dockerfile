# Stage 1: Build the React application
# FROM node:alpine AS development

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN yarn install

# COPY . .
# RUN ls -al  

# RUN yarn run build

# Stage 2: Serve the built application with a lightweight web server
FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /user/src/app

COPY package*.json ./

# Install only production dependencies
RUN yarn --production

# Install serve package globally (required to serve the built application)
RUN yarn global add serve

# Copy the built application from the development stage
COPY --from=development /user/src/app/dist ./dist

EXPOSE 9001

# Start the web server to serve the built application
CMD ["serve", "-s", "dist"]
