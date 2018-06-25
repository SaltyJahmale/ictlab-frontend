# Get the latest version of node 
FROM node:latest

# Create app directorybower install --allow-root 
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app

# run command
RUN npm install 

# Bundle app source
COPY . /usr/src/app

# expose port 8080
EXPOSE 8080

# run command
CMD ["npm run dev"] 