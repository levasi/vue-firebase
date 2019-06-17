<template>
  <div id="app">
    <Authentication/>
    <div class="hm-add-post">
      <input v-model="post.title" type="text" placeholder="title">
      <input v-model="post.content" type="text" placeholder="content">
      <button @click="createPost">add post</button>
    </div>
    <div class="hm-post-list">
      <div class="hm-post-list-item" v-for="(product, index) in allProducts" :key="index">
        <button @click="deleteProduct(index)">deleteProduct</button>
        <h3>{{product.title}}</h3>
        <p>{{product.content}}</p>
        <div class="hm-product-images-wrapper" v-if="product.images">
          <div class="hm-product-image" v-for="(imageUrl, index) in product.images" :key="index">
            <img :src="imageUrl" alt>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainNavigation from "./components/MainNavigation.vue";
import firebase from "firebase";
import { db } from "./firebase";
export default {
  name: "app",
  data() {
    return {
      post: {
        title: "",
        content: ""
      },
      products: [],
      allProducts: []
    };
  },
  components: {
    MainNavigation
  },
  computed: {},
  watch: {},
  created() {
    const that = this;
    db.ref("products").on("value", function(snapshot) {
      that.allProducts = snapshot.val();
    });
    if (firebase.auth().currentUser) {
      const currentUser = firebase.auth().currentUser;
      const email = currentUser.email;
      const displayName = currentUser.displayName;
      const photoURL = currentUser.photoURL;
      const uid = currentUser.uid;
      const displayNameFormat = displayName.replace(/\s/g, "").toLowerCase();

      const userDbRef = `${displayNameFormat}_${uid}`;

      this.$store.commit("setCurrentUser", {
        email,
        displayName,
        photoURL,
        uid,
        userDbRef
      });
    }
  },
  methods: {
    createPost() {
      db.ref("products")
        .push(this.post)
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    deleteProduct(index) {
      console.log(index);
      db.ref(`products/${index}`).remove();
    }
  }
};
</script>

<style lang="scss">
.hm-post-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-basis: 33%;
  margin-top: 15px;
}
ul {
  margin: 0;
  padding: 0;
}
h4 {
  margin: 0;
  padding: 0;
  margin-bottom: 15px;
}
#app {
  padding: 0 15px;
}
.hm-post-list-item {
  transition: all 0.33s ease;
  &:hover {
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  }
  padding: 15px;
  width: 33%;
  box-sizing: border-box;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
