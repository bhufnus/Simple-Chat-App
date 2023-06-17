FROM node:16.14.2

WORKDIR /app
# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the local source code to the working directory of the image
COPY . .

# Build the application
RUN npm run build

# Install serve to serve the application
RUN npm install -g serve

# The application listens on port 5000
EXPOSE 5000

# Serve the application
CMD ["serve", "-s", "build"]