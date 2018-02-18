FROM node:latest

# Install Google Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -y google-chrome-stable

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g ionic cordova
RUN ionic cordova platform add android
RUN npm install --save @ionic-native/core
RUN ionic plugin add cordova-plugin-statusbar
RUN npm install --save @ionic-native/status-bar
RUN ionic plugin add cordova-plugin-splashscreen
RUN npm install --save @ionic-native/splash-screen
RUN ionic cordova plugin add cordova-sqlite-storage --save
RUN npm install --save @ionic/storage
RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
