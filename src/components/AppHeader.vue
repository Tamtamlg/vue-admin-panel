<template>
  <header class="header">
    <div class="header-block header-block-search">{{dateNow}}</div>
    <div class="header-block header-block-nav">
      <ul class="nav-profile">
        <li class="profile dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            role="button"
            @click.prevent.stop="showDropdown = !showDropdown"
          >
            <span class="name">Здравствуйте, Ирина</span>
          </a>
          <div class="dropdown-menu profile-dropdown-menu" v-if="showDropdown">
            <router-link
              :to="{name: item.route}"
              class="dropdown-item"
              v-for="item in menuLinks"
              :key="item.route"
               @click.native="showDropdown = !showDropdown"
            >
              <i class="fa" :class="`fa-${item.icon}`"></i>
              {{item.name}}
            </router-link>
            <router-link to="/login" class="dropdown-item">
              <i class="fa fa-power-off"></i> Выход
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import moment from "moment";

export default {
  name: "AppHeader",
  data() {
    return {
      showDropdown: false
    };
  },
  computed: {
    dateNow() {
      return moment(new Date()).format("DD.MM.YYYY");
    },
    menuLinks() {
      return this.$store.state.menuLinks;
    }
  }
};
</script>

<style scoped lang="scss">
.dropdown-menu.profile-dropdown-menu {
  display: block;
  .router-link-exact-active {
    background-color: #52bcd3;
    color: #fff !important;
  }
}
</style>
