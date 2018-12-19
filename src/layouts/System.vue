<template>
  <div class="main-wrapper">
    <div class="app">
      
      <app-header></app-header>

      <app-sidebar></app-sidebar>

      <!-- CONTENT -->
      <slot/>
      <!-- /CONTENT -->
      
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppSidebar from "@/components/AppSidebar.vue";

export default {
  components: {
    AppHeader,
    AppSidebar
  }
};
</script>
