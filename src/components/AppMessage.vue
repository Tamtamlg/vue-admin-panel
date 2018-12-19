<template>
  <div class="alert app-message" :class="{'alert-danger': error, 'alert-success': !error}">
    {{message}}
  </div>
</template>

<script>
export default {
  computed: {
    message() {
      return this.$store.state.message;
    },
    error() {
      return this.$store.state.error;
    }
  }
}
</script>

<style>
.app-message {
  position: fixed;
  top: 6px;
  right: 10px;
  width: 300px;
  z-index: 100500;
}
</style>
