<template>
  <div class="hm-register fc">
    <label for="name">
      <span>name</span>
      <input v-model="registerData.name" type="text" name="name">
    </label>
    <label for="email">
      <span>email</span>
      <input v-model="registerData.email" type="email" name="email">
    </label>
    <label for="password">
      <span>password</span>
      <input v-model="registerData.password" type="password">
    </label>
    <button @click="register">create account</button>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Register",
  data() {
    return {
      registerData: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    register() {
      const that = this;
      console.log("register");
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.registerData.email,
          this.registerData.password
        )
        .then(user => {
          console.log(user);

          // Updates the user attributes:
          user
            .updateProfile({
              displayName: "Jane Q. User",
              photoURL: "https://example.com/jane-q-user/profile.jpg"
            })
            .then(
              function() {
                var displayName = user.displayName;
                var photoURL = user.photoURL;
                console.log(displayName);
                console.log(photoURL);
              },
              function(error) {
                // An error happened.
              }
            );
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
    }
  }
};
</script>

<style>
</style>
