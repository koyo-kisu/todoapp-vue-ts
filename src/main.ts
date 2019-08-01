import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCIsFq1V279J2POHIHjG5pJU2pprGA_XA0",
    authDomain: "todoapp-vue-ts.firebaseapp.com",
    databaseURL: "https://todoapp-vue-ts.firebaseio.com",
    projectId: "todoapp-vue-ts",
    storageBucket: "",
    messagingSenderId: "460473785799",
    appId: "1:460473785799:web:a32aa0a5cfae8d8c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  if (!firebase.apps.length) {
    firebase.initializeApp({});
}

Vue.config.productionTip = false

export const db = firebase.firestore()

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
