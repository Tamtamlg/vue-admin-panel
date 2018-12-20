<template>
  <article class="content">
    <div class="title-block">
      <h3 class="title">Страница истории
        <span class="sparkline bar"></span>
      </h3>
    </div>

    <section class="section">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header bordered">
              <div class="header-block">
                <h3 class="title">Список событий</h3>
              </div>
              <!-- <div class="form-inline pull-right mr-2">
                <div class="form-group">
                  <input type="email" class="form-control" placeholder="Поиск...">
                </div>
                <div class="btn-group">
                  <button type="button" class="btn btn-secondary dropdown-toggle">Параметр</button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Separated link</a>
                  </div>
                </div>
              </div> -->
            </div>
            <div class="card-block">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Сумма</th>
                    <th>Дата</th>
                    <th>Категория</th>
                    <th>Тип</th>
                    <th class="text-lg-center">Действие</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in events" :key="index">
                    <th scope="row">{{index + 1}}</th>
                    <td>{{item.amount}}</td>
                    <td>{{(item.date).substring(0, 10)}}</td>
                    <td>{{getCategoryName(+item.category)}}</td>
                    <td>
                      <span class="badge badge-danger" v-if="item.type === 'outcome'">Расход</span>
                      <span class="badge badge-success" v-if="item.type === 'income'">Доход</span>
                    </td>
                    <td class="text-lg-center">
                      <a href="#" class="btn btn-primary-outline">Открыть</a>
                    </td>
                  </tr>
                </tbody>
              </table>
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
    events() {
      return this.$store.state.events;
    },
    categories() {
      return this.$store.state.categories;
    }
  },
  methods: {
    getEvents() {
      this.$store.dispatch('getEvents');
    },
    getCategories() {
      this.$store.dispatch('getCategories');
    },
    getCategoryName(id) {
      return this.categories.filter(item => {
        return item.id === id;
      }).map(item => item.name)[0]
    }
  },
  created() {
    this.getEvents();
    this.getCategories();
  }
};
</script>
