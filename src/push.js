import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBlxbd-tbwULLKAWkeXmONKIOHexJdigkY",
    authDomain: "agent-app-784bc.firebaseapp.com",
    databaseURL: "https://agent-app-784bc.firebaseio.com",
    projectId: "agent-app-784bc",
    messagingSenderId: "411389581287",
    appId: "1:411389581287:web:b98c8761b2e836c5"
  
}
export const initializeFirebase = () => {
  firebase.initializeApp(config);
  seekPermission();
  getmsgs();
}

export const seekPermission = async () => {

    const messaging = firebase.messaging();
    await messaging.requestPermission()
    .then(async function(){
        const token = await messaging.getToken();
        localStorage.setItem("device-token", token);
        console.log(token);
    })
    .catch(function(err){
        console.log('Error occured');
    })
}

export const getmsgs = () => {
    const messaging = firebase.messaging();
    messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
        // ...
      });
}


