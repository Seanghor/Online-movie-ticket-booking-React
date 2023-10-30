
# ------------------------------------------------
# Choose a proper node image for the build stage:
FROM node:16-alpine AS BUILD_IMAGE
WORKDIR /app/react-app

# Copy package.json and pnpm-lock.yaml:
COPY package.json pnpm-lock.yaml ./

# Install our package using pnpm:
RUN npm install -g pnpm
RUN pnpm install

# Copy all remaining files:
COPY . .

# Finally, build our project:
RUN pnpm build

# Beginning of the second stage:
FROM node:16-alpine AS PRODUCTION_IMAGE
WORKDIR /app/react-app  

# Copy the /app/react-app/dist/ folder from BUILD_IMAGE to /app/react-app/dist/ in PRODUCTION_IMAGE
COPY --from=BUILD_IMAGE /app/react-app/dist/ /app/react-app/dist/
COPY --from=BUILD_IMAGE /app/react-app/node_modules /app/react-app/node_modules


# Expose the application port
EXPOSE 1000

# To run: pnpm run preview
# We need package.json and vite.config.ts
COPY package.json vite.config.ts ./

# Install TypeScript globally (if needed)
RUN npm install typescript -g

# Install pnpm in the production image (if needed)
RUN npm install -g pnpm

# Command to start the application
CMD ["pnpm", "run", "preview"]

