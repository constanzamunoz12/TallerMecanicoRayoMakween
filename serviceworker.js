/////////////////////////////////////////
// Manejo del service worker
////////////////////////////////////////

var CACHE_NAME = 'cache_makween';
var urlsToCache = [
    '/',
    '/static/css/hojaJQ.css',
    '/static/dist/css/lightbox.min.css',
    '/static/css/servicios.css',
    '/galeria/',
];

/*
static "css/servicios.css" %}>
  <link rel="stylesheet" href= {% static "dist/css/lightbox.min.css" %}>
*/


self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});


self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {

          return fetch(event.request)
          .catch(function(rsp) {
             return response; 
          });
          
          
        })
    );
});



//solo para cachear todo reemplazar por esta versión del Fetch

// No implementado

/*
self.addEventListener('fetch', function(event) {
    event.respondWith(

      fetch(event.request)
      .then((result)=>{
        return caches.open(CACHE_NAME)
        .then(function(c) {
          c.put(event.request.url, result.clone())
          return result;
        })
        
      })
      .catch(function(e){
          return caches.match(event.request)
      })
  

     
    );
});
*/


///////////////////////////////////
// Manejo de notificaciones
//////////////////////////////////



//<script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>

    importScripts("https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js") 
    importScripts("https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js")

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
      apiKey: "AIzaSyDrsigUEOE3Av341xLMiHJ-71_zKyPXW-w",
      authDomain: "makween-73849.firebaseapp.com",
      projectId: "makween-73849",
      storageBucket: "makween-73849.appspot.com",
      messagingSenderId: "895416676787",
      appId: "1:895416676787:web:e9fca110c9ecc69db25bc6",
      measurementId: "G-DL2H84JL28"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


////////////////////////////////////////////////////////////
let messaging = firebase.messaging();
/////////////// modelo de notificacion offline ////////////
messaging.setBackgroundMessageHandler(function(payload) {
    let titulo = payload.notification.title
    let opciones = {
        body: payload.notification.body,
        icon: payload.notification.icon
    }
    self.registration.showNotification(titulo, opciones)
});
////////////////////////////////////////////////////////////



/*
navigator.serviceWorker
.register('serviceworker.js')
*/