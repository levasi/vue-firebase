<template>
  <div class="hm-authentication">
    <router-link class="hm-logo" to="/">Home</router-link>
    <div class="hm-authentication-right">
      <Modal :open="registerModal" @close-modal="registerModal = false">
        <Register slot="content"></Register>
      </Modal>

      <Modal :open="addProduct" @close-modal="addProduct = false">
        <AddProduct slot="content"></AddProduct>
      </Modal>
      <Modal :open="myProductsModal" @close-modal="myProductsModal = false">
        <MyProducts slot="content"></MyProducts>
      </Modal>

      <Modal :open="loginModal" @close-modal="loginModal = false">
        <Login slot="content"></Login>
      </Modal>

      <div class="hm-user-menu" v-if="isCurrentUser">
        <button @click="myProductsModal = true">My products</button>
        <button @click="addProduct = true">Add product</button>

        <button @click>Account</button>

        <button @click>Messages</button>
        <button @click>Favorites</button>
      </div>
      <div v-if="!isCurrentUser">
        <button @click="loginModal = true">Login</button>
        <button @click="googleLogin()">Google Sign In</button>
        <button @click="registerModal= true">Register</button>
      </div>
      <button @click="signOut()">Sign Out</button>

      <!-- <span>{{currentUserDisplayName}}</span> -->
      <div class="hm-user-photo">
        <img v-if="userPhotoURL" :src="userPhotoURL" alt>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import AddProduct from "./AddProduct";
import MyProducts from "./MyProducts";
import Register from "./Register";
import Login from "./Login";
export default {
  name: "Authentication",
  data() {
    return {
      registerModal: false,
      loginModal: false,
      addProduct: false,
      myProductsModal: false,
      email: "",
      password: "",
      userPhotoURL: ""
    };
  },
  components: {
    AddProduct,
    MyProducts,
    Register,
    Login
  },
  methods: {
    addProductModal() {
      this.addProduct = true;
    },

    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          this.userName = true;
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
          console.log("signed out");
        })
        .catch(function(error) {
          // An error happened.
          console.log(error);
        });
      this.userName = false;
    },
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          console.log(this);
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
    }
  },
  created() {
    if (firebase.auth().currentUser) {
      this.userPhotoURL = firebase.auth().currentUser.photoURL;
    }
  },
  watch: {},
  computed: {
    currentUserDisplayName() {
      var user = firebase.auth().currentUser || "";

      return user.displayName;
    },
    isCurrentUser() {
      return firebase.auth().currentUser ? true : false;
    }
  }
};
</script >

<style lang="scss">
.hm-user-photo {
  width: 33px;
  height: 33px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 15px;
  img {
    width: 100%;
  }
}
.fc {
  display: flex;
  flex-direction: column;
}

.hm-close-button {
  position: absolute;
  cursor: pointer;
  right: 5px;
  top: 5px;
}
</style>
