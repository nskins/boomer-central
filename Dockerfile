# Build from Node.js v8.9.1 (Carbon).
FROM node:carbon

# Create app directory.
WORKDIR /usr/src/app

# Install app dependencies.
COPY package*.json ./
RUN npm install

# Install bower components.
COPY .bowerrc ./
COPY bower.json ./
RUN npm install -g bower
RUN bower install --allow-root

# Bundle app source.
COPY . .

# Expose the application's port.
EXPOSE 3000