FROM node:18-alpine

# Set platform-specific environment variables
ARG TARGETPLATFORM
RUN echo "Building for $TARGETPLATFORM"

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Make entrypoint script executable
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

# Expose the port the app runs on
EXPOSE 3000

# Set entrypoint to our script
ENTRYPOINT ["/docker-entrypoint.sh"]

# Command to run the application
CMD ["npm", "start"]