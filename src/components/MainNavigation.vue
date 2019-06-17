<template>
  <div class="hm-main-navigation"></div>
</template>

<script>
export default {
  name: "MainNavigation",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.hm-main-navigation__list {
  flex: 8;
}
.hm-authentication {
  display: flex;
  justify-content: space-between;
  flex: 2;
  align-items: center;
}
.hm-authentication-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.hm-main-navigation {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 15px;
  ul {
    padding: 0;
    display: flex;
    justify-content: center;
    list-style-type: none;
    margin: 10px 0;
  }
}
.hm-main-navigation__list-item {
  margin-right: 10px;
}
</style>
