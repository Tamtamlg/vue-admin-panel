<template>
  <article class="content">
    <div class="title-block">
      <h3 class="title">
        <router-link :to="{name: 'history'}">
          <i class="fa fa-arrow-left"></i>
        </router-link>
        Страница записи № {{id}}
        <span class="sparkline bar"></span>
      </h3>
    </div>
    <app-loader v-if="loading"></app-loader>
    <section class="section container" v-else>
      <div class="row">
        <div class="col-6 offset-3">
          <div class="card card-success" :class="{'card-success': event.type === 'income', 'card-danger': event.type === 'outcome'}">
            <div class="card-header">
              <div class="header-block">
                <p class="title" v-if="event.type === 'income'">Доход</p>
                <p class="title" v-if="event.type === 'outcome'">Расход</p>
              </div>
            </div>
            <div class="card-block">
              <ul>
                <li>Сумма:
                  <strong>{{event.amount}}</strong>
                </li>
                <li>Категория:
                  <strong>{{category}}</strong>
                </li>
                <li>Описание:
                  <strong>{{event.description}}</strong>
                </li>
              </ul>
            </div>
            <div class="card-footer">{{event.date}}</div>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import AppLoader from "@/components/AppLoader.vue"
export default {
  components: {
    AppLoader
  },
  data() {
    return {
      id: +this.$route.params.id
    }
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    event() {
      return this.$store.state.events.filter(item => {
        return item.id === this.id;
      })[0];
    },
    category() {
      return this.$store.state.categories.filter(item => {
        return item.id === this.id;
      }).map(item => item.name)[0];
    }
  },
  methods: {
    getEvents() {
      this.$store.dispatch('getEvents');
    },
    getCategories() {
      this.$store.dispatch('getCategories');
    }
  },
  created() {
    this.getEvents();
    this.getCategories();
  }
};
</script>
