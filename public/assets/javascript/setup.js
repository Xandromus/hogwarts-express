window.firebase = function() {
 
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCJtIdSgRXLxC9RJFp1yE_WeONxHo1Vz8s",
    authDomain: "xander-train-scheduler.firebaseapp.com",
    databaseURL: "https://xander-train-scheduler.firebaseio.com",
    projectId: "xander-train-scheduler",
    storageBucket: "xander-train-scheduler.appspot.com",
    messagingSenderId: "879356457846"
  };
  firebase.initializeApp(config);

  return firebase;
}()
