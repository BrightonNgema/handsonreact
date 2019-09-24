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
    const promiseChain = clients
      .matchAll({
        type: "window",
        includeUncontrolled: true
      })
      .then(windowClients => {
        for (let i = 0; i < windowClients.length; i++) {
          const windowClient = windowClients[i];
          windowClient.postMessage(payload);
        }
      })
      .then(() => {
        return registration.showNotification("my notification title");
      });
    return promiseChain;
  });
//   self.addEventListener('notificationclick', function(event) {
//     // do what you want
//     // ...
//   });


// messaging.setBackgroundMessageHandler(function(payload) {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     // const notificationTitle = 'Background Message Title';
//     // const notificationOptions = {
//     //     body: 'Background Message body.',
//     //     icon: '/firebase-logo.png'
//     // };

 self.registration.showNotification(notificationTitle,
    notificationOptions);
// });
