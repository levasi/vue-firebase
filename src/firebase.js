import { initializeApp } from 'firebase'

const app = initializeApp({
    apiKey: "AIzaSyAB9wThRqjmVxFa9II2CYrU_9q1NOAUAmg",
    authDomain: "vue-firebase-812f5.firebaseapp.com",
    databaseURL: "https://vue-firebase-812f5.firebaseio.com",
    projectId: "vue-firebase-812f5",
    storageBucket: "vue-firebase-812f5.appspot.com",
    messagingSenderId: "970420153821",
    appId: "1:970420153821:web:89f8c2f82ab01db6"
})

export const db = app.database()

export const namesRef = db.ref('names')