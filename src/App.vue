<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
    <app-message v-if="message"></app-message>
  </div>
</template>

<script>
import AppMessage from "@/components/AppMessage.vue";

const defaultLayout = "system";

export default {
  components: {
    AppMessage
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || defaultLayout) + "-layout";
    },
    message() {
      return this.$store.state.message;
    }
  }
}
</script>


<style lang="scss">
@import "assets/vendor.scss";
@import "assets/theme.scss";

</style>
