# Step 1: Use an official Node.js image (alpine for smaller size)
FROM node:18-alpine AS build

# Step 2: Set working directory
WORKDIR /usr/src/app

# Step 3: Copy package files first (for caching)
COPY package*.json ./

# Step 4: Install dependencies (using ci for clean installs)
RUN npm ci --legacy-peer-deps

# Step 5: Copy all project files
COPY . .

# Step 6: Build the production version of the app
RUN npm run build

# ---- Production Stage ----
FROM node:18-alpine

# Step 7: Install serve globally (to serve static files)
RUN npm install -g serve

# Step 8: Set working directory
WORKDIR /app

# Step 9: Copy only the build output from the previous stage
COPY --from=build /usr/src/app/dist ./dist

# Step 10: Expose port 8080
EXPOSE 8080

# Step 11: Serve the app
CMD ["serve", "-s", "dist", "-l", "8080"]


# # Step 1: Use an official Node.js runtime as the base image
# FROM node:18-alpine

# # Step 2: Set the working directory to /usr/src/app
# WORKDIR /usr/src/app

# # Step 3: Copy package.json and package-lock.json (for npm install)
# COPY package*.json ./

# # Step 4: Install dependencies
# RUN npm install

# # Step 5: Copy the rest of the application files
# COPY . .

# # Step 6: Build the app
# RUN npm run build

# # Step 7: Install the serve package globally to serve the build
# RUN npm install -g serve

# # Step 8: Expose the port the app will run on
# EXPOSE 8080

# # Step 9: Serve the app from the "dist" folder
# CMD ["serve", "-s", "dist", "-l", "8080"]
