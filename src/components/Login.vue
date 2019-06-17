<template>
  <div class="hm-login">
    <label for="email">
      <span>email</span>
      <input v-model="loginData.email" type="email" name="email">
    </label>
    <label for="password">
      <span>password</span>
      <input v-model="loginData.password" type="password">
    </label>
    <button @click="login">login</button>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Login",
  data() {
    return {
      loginData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(
          this.loginData.email,
          this.loginData.password
        )
        .then(result => {
          console.log(result);
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    }
  }
};
</script>

<style>
</style>
