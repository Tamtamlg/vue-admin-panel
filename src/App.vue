<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
    <flash-message class="flash-message"></flash-message>
  </div>
</template>

<script>

const defaultLayout = "system";

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || defaultLayout) + "-layout";
    }
  }
}
</script>


<style lang="scss">
@import "assets/vendor.scss";
@import "assets/theme.scss";
@import "../node_modules/vue-flash-message/dist/vue-flash-message.min.css";

.flash-message {
  display: flex;
  position: fixed;
  top: 10px;
  right: 10px;
}

.flash__message {
  width: 260px;
  transition: all .5s;
  font-size: 13px;
  line-height: 130%;
}

</style>
