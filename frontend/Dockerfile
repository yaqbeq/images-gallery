FROM node:20-alpine3.20

# Set the working directory to /app. It is not recommended to use the root directory.
WORKDIR /app 
EXPOSE 3000

# Copy only dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --silent

# Copy the rest of the application
COPY . .

# Run the application
CMD ["npm", "start"]