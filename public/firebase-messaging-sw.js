importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyBlxbd-tbwULLKAWkeXmONKIOHexJdigkY",
    authDomain: "agent-app-784bc.firebaseapp.com",
    databaseURL: "https://agent-app-784bc.firebaseio.com",
    projectId: "agent-app-784bc",
    messagingSenderId: "411389581287",
    appId: "1:411389581287:web:b98c8761b2e836c5"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.staus
    };

 return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
