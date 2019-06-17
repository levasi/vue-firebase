<template>
  <div class="hm-my-products">
    <div class="hm-product" v-for="(product, index) in products" :key="index">
      <div class="hm-product-actions">
        <button @click="removeProduct($event, product.id)" class>remove product</button>
      </div>
      <h4>{{product.name}}</h4>
      <p>{{product.description}}</p>
      <div class="hm-product-images-wrapper" v-if="product.images">
        <div class="hm-product-image" v-for="(imageUrl, index) in product.images" :key="index">
          <img :src="imageUrl" alt>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "MyProducts",
  data() {
    return {
      products: [],
      imagesUrl: []
    };
  },
  methods: {
    getProducts() {
      const that = this;
      if (this.$store.state.user.currentUser.uid) {
        const { displayName, uid } = this.$store.state.user.currentUser;
        const displayNameFormat = displayName.replace(/\s/g, "").toLowerCase();
        const userDbRef = `${displayNameFormat}_${uid}`;
        firebase
          .firestore()
          .collection("products")
          .where("userUid", "==", uid)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              let product = {
                ...doc.data(),
                id: doc.id
              };
              that.products.push(product);
            });
          });
      }
    },
    removeProduct(event, id) {
      const that = this;
      const { displayName, uid } = this.$store.state.user.currentUser;
      const displayNameFormat = displayName.replace(/\s/g, "").toLowerCase();
      const userDbRef = `${displayNameFormat}_${uid}`;
      firebase
        .firestore()
        .collection("products")
        .doc(id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>
<style lang="scss">
.hm-product-images-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 15px;
}
</style>
