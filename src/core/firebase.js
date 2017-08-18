import Vue from "vue"
import VueFire from "vuefire"
import firebase from "firebase"

Vue.use(VueFire)

const app = firebase.initializeApp({
  apiKey: "AIzaSyCqD5wQr641d20zXoynH7mbY3gUwet5y0g",
  authDomain: "tapstories-42913.firebaseapp.com",
  databaseURL: "https://tapstories-42913.firebaseio.com",
  storageBucket: "tapstories-42913.appspot.com",
  messagingSenderId: "1088568115481"
})

export const db = app.database()

window.firebase = app

export default app
