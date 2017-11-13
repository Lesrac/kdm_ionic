Setup:
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


Start:
ionic serve

On Android:
ionic cordova run android --livereload

list connected devices:
adb devices

Aims:
Was will ich machen können:
- Dinge nachschlagen
		* bestimmte Events die Aufgrund von Survivor lvl Aufstieg oder Lantern Years eintreten (ohne das Regelbuch zur Hand nehmen zu müssen)
- Karten Mischen soll übernommen werden (herausfinden welche Ressourcen man nach einem Showdown erhält oder welche Innovations errungen werden)
		* Evtl. auch das Monster Deck zusammenstellen und Aufdecken
- Settlement Verwaltung
- Survivor Verwaltung


Was will ich nicht können:
- Das Regelbuch 1:1 Abbilden
