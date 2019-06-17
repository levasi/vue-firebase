import Vue from 'vue'
import App from './App.vue'
import Authentication from './components/Authentication.vue'
import Modal from './components/Modal.vue'
import firebase from 'firebase';
import store from './store/'
import router from './router.js'
import './firebase'
Vue.component('Authentication', Authentication)
Vue.component('Modal', Modal)
Vue.config.productionTip = false
// Importing the global css file
import "@/assets/global.css"
let app;
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      store,
      router,
      el: '#app',
      // router,
      render: h => h(App),
    }).$mount('#app');
  }
});