<template>
  <article class="content dashboard-page">
    <div class="title-block">
      <h3 class="title pull-left">Страница счета
        <span class="sparkline bar"></span>
      </h3>
      <div class="pull-right">
        <button class="btn-sm btn btn-primary-outline" @click="getCurrensy">
          <i class="fa fa-refresh"></i>
        </button>
      </div>
    </div>
    <app-loader v-if="loading"></app-loader>
    <section class="section" v-else>
      <div class="row">
        <div class="col col-xs-12 col-sm-12 col-md-6 col-xl-5 stats-col mb-3">
          <bill-card></bill-card>
        </div>
        <div class="col col-xs-12 col-sm-12 col-md-6 col-xl-7 history-col mb-3">
          <currency-card></currency-card>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import BillCard from "@/components/BillCard.vue";
import CurrencyCard from "@/components/CurrencyCard.vue";
import AppLoader from "@/components/AppLoader.vue"

export default {
  components: {
    BillCard,
    CurrencyCard,
    AppLoader
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    getCurrensy() {
      this.$store.dispatch("getCurrensy");
    }
  },
  created() {
    this.getCurrensy();
  }
};
</script>

<style>
</style>