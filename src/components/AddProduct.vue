<template>
  <div class="hm-add-product fc">
    <label for="name" class="fc">
      <span>name</span>
      <input v-model="product.name" type="text" name="name">
    </label>
    <label for="description" class="fc">
      <span>description</span>
      <input v-model="product.description" type="text">
    </label>
    <label for="description">
      <input type="file" @change="setImages" multiple>
    </label>
    <div hm-product-preview>
      <div class="hm-product-preview__images">
        <div
          class="hm-product-preview__images-item"
          v-for="(imageURL, index) in previewUrls"
          :key="index"
        >
          <img :src="imageURL" alt>
        </div>
      </div>
    </div>
    <span v-if="uploadingProduct">uploading product...</span>
    <span v-if="productUploaded">Your product has been added succesfully</span>
    <button @click="addProduct">Add product</button>
  </div>
</template>
<script>
import firebase from "firebase";
import { log } from "util";
export default {
  name: "AddProduct",
  data() {
    return {
      product: {
        name: "",
        description: "",
        images: [],
        userUid: ""
      },
      imagesToUpload: [],
      previewUrls: [],
      uploadingProduct: false,
      productUploaded: false
    };
  },
  methods: {
    addProduct() {
      this.uploadingProduct = true;
      var storageRef = firebase.storage().ref();
      const { displayName, uid } = this.$store.state.user.currentUser;
      const displayNameFormat = displayName.replace(/\s/g, "").toLowerCase();
      const userDbRef = `${displayNameFormat}_${uid}`;
      const fileCount = this.imagesToUpload.length;
      const files = this.imagesToUpload;
      const that = this;
      const productToUpload = {
        ...this.product,
        userUid: uid
      };
      console.log(productToUpload);

      for (let i = 0; i < fileCount; i++) {
        var storageRef = firebase
          .storage()
          .ref(`product-images/${files[i].name}`);
        let uploadTask = storageRef.put(files[i]);
        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {},
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.product.images.push(downloadURL);
              if (i === fileCount - 1) {
                firebase
                  .firestore()
                  .collection("products")
                  .add(productToUpload)
                  .then(function(docRef) {
                    that.uploadingProduct = false;
                    that.productUploaded = true;
                  })
                  .catch(function(error) {
                    console.error("Error adding document: ", error);
                  });
              }
            });
          }
        );
      }
    },
    setImages(event) {
      if (event.target.files.length) {
        const fileCount = event.target.files.length;
        let files = event.target.files;
        for (let i = 0; i < fileCount; i++) {
          let url = URL.createObjectURL(files[i]);
          this.previewUrls.push(url);
          this.imagesToUpload.push(files[i]);
        }
      }
    }
  }
};
</script>

<style lang="scss">
.hm-product-preview__images {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 15px;
}
</style>
