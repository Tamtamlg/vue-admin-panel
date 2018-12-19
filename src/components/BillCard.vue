<template>
  <div class="card stats h-100 m-0">
    <div class="card-block">
      <div class="title-block">
        <h4 class="title">Счет</h4>
      </div>
      <div class="row row-sm flex-column stats-container">
        <div class="col-12 stat-col">
          <div class="stat-icon">
            UAH
          </div>
          <div class="stat">
            <div class="value">{{bills}}</div>
          </div>
          <progress class="progress stat-progress" value="100" max="100">
            <div class="progress">
              <span class="progress-bar" style="width: 100%;"></span>
            </div>
          </progress>
        </div>
        <div class="col-12 stat-col">
          <div class="stat-icon">
            USD
          </div>
          <div class="stat">
            <div class="value">{{Math.round((bills / (+usdRate))*100)/100}}</div>
          </div>
          <progress class="progress stat-progress" value="100" max="100">
            <div class="progress">
              <span class="progress-bar" style="width: 100%;"></span>
            </div>
          </progress>
        </div>
        <div class="col-12 stat-col">
          <div class="stat-icon">
            EUR
          </div>
          <div class="stat">
            <div class="value">{{Math.round((bills / (+eurRate))*100)/100}}</div>
          </div>
          <progress class="progress stat-progress" value="100" max="100">
            <div class="progress">
              <span class="progress-bar" style="width: 100%;"></span>
            </div>
          </progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    bills() {
      return this.$store.state.bills;
    },
    eurRate() {
      return this.$store.state.currency.filter(item => {
        return item.ccy.toUpperCase() === "EUR";
      }).map(item => item.sale)[0];
    },
    usdRate() {
      return this.$store.state.currency.filter(item => {
        return item.ccy.toUpperCase() === "USD";
      }).map(item => item.sale)[0];
    }
  }
};
</script>

<style>
</style>
