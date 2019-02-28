<template>
  <aside class="sidebar">
    <div class="sidebar-container">
      <div class="sidebar-header">
        <div class="brand">
          <div class="logo">
            <span class="l l1"></span>
            <span class="l l2"></span>
            <span class="l l3"></span>
            <span class="l l4"></span>
            <span class="l l5"></span>
          </div>
        </div>
      </div>
      <nav class="menu">
        <ul class="nav metismenu">
          <li v-for="item in menuLinks" :key="item.route">
            <router-link :to="{name: item.route}">
              <i class="fa" :class="`fa-${item.icon}`"></i>
              {{item.name}}
            </router-link>
          </li>
          <li>
            <a href="#" @click="onLogout">
              <i class="fa fa-power-off"></i> Выход
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
export default {
  computed: {
    menuLinks() {
      return this.$store.state.menuLinks;
    }
  },
  methods: {
    onLogout() {
     this.$store.dispatch("onLogout").then(() => {
        this.$router.push('/login')
      });
    }
  }
};
</script>

<style lang="scss">
.sidebar .menu .metismenu {
  display: block;
  .router-link-exact-active {
    background-color: #52bcd3;
    color: #fff;
  }
}
</style>
