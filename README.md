#Setup:
Needs Android and NPM installed
npm install -g ionic cordova
ionic cordova platform add android
npm install --save @ionic-native/core
ionic plugin add cordova-plugin-statusbar
npm install --save @ionic-native/status-bar
ionic plugin add cordova-plugin-splashscreen
npm install --save @ionic-native/splash-screen
ionic cordova plugin add cordova-sqlite-storage --save
npm install --save @ionic/storage
npm install


#Start:
ionic serve

##On Android:
ionic cordova run android --livereload

##list connected devices:
adb devices

#Docker Setup:
docker run -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock --name jenkins jenkins/jenkins:lts
docker exec -it -u root jenkins bash
apt-get update && apt-get -y install apt-transport-https ca-certificates curl gnupg2 software-properties-common && curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg > /tmp/dkey; apt-key add /tmp/dkey && add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") $(lsb_release -cs) stable" && apt-get update && apt-get -y install docker-ce
chmod 777 /var/run/docker.sock
