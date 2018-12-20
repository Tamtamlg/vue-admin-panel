<template>
  <article class="content">
    <div class="title-block">
      <h3 class="title">
        Страница планирования
        <span class="sparkline bar"></span>
      </h3>
    </div>
    <section class="section">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header card-header-sm bordered">
              <div class="header-block">
                <h3 class="title">Расходы</h3>
              </div>
              <h5 class="planning-expenses pull-right">
                Общий остаток:
                <span class="text-success">{{bills}} грн</span>
              </h5>
            </div>
            <div class="card-block">
              <div class="row" v-for="item in categories" :key="item.id">
                <div class="col-md-6">
                  <div class="n-progress">
                    <div
                      class="progress-bar"
                      :class="getProgressBarClassName(item)"
                      :style="'width: ' + getPercent(item)"
                    >
                      <span>{{item.name}}</span>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <p>
                    <span :class="`text-` + getProgressBarClassName(item)">{{getCategoryCost(item)}}</span>
                    из
                    <span class="text-primary">{{item.capacity}}</span>
                    |
                    осталось
                    <span
                      :class="`text-` + getProgressBarClassName(item)"
                    >{{item.capacity - getCategoryCost(item)}}</span> грн
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  computed: {
    categories() {
      return this.$store.state.categories;
    },
    bills() {
      return this.$store.state.bills;
    },
    events() {
      return this.$store.state.events;
    }
  },
  methods: {
    getCategories() {
      this.$store.dispatch("getCategories");
    },
    getCurrensy() {
      this.$store.dispatch("getCurrensy");
    },
    getEvents() {
      this.$store.dispatch("getEvents");
    },
    getCategoryCost(category) {
      const categoryEvents = this.events.filter(
        item => item.category === category.id && item.type === "outcome"
      );
      return categoryEvents.reduce((total, item) => {
        total += item.amount;
        return total;
      }, 0);
    },
    getPercent(category) {
      const percent =
        (this.getCategoryCost(category) * 100) / category.capacity;
      return percent > 100 ? "100%" : percent + "%";
    },
    getProgressBarClassName(category) {
      const percent =
        (this.getCategoryCost(category) * 100) / category.capacity;
      return percent < 60 ? "success" : percent >= 100 ? "danger" : "warning";
    }
  },
  created() {
    this.getCategories();
    this.getCurrensy();
    this.getEvents();
  }
};
</script>
