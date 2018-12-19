<template>
  <div class="card h-100 m-0">
    <div class="card-block">
      <div class="title-block">
        <h4 class="title">Курс</h4>
      </div>
      <div class="row row-sm stats-container">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс, UAH</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in currency" :key="item.ccy">
              <td>{{item.ccy}}</td>
              <td>{{item.sale}}</td>
              <td>{{dateNow}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  computed: {
    currency() {
      return this.$store.state.currency.filter(item => {
        return item.ccy.toUpperCase() !== "RUR";
      });
    },
    dateNow() {
      return moment(new Date()).format("DD.MM.YYYY");
    }
  }
};
</script>

<style>
</style>
