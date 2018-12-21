<template>
  <article class="content">
    <div class="title-block">
      <h3 class="title">
        Страница истории
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
              </div>-->
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
                  <tr v-for="(item, index) in displayedPosts" :key="index">
                    <th scope="row">{{item.id}}</th>
                    <td>{{item.amount}}</td>
                    <td>{{(item.date).substring(0, 10)}}</td>
                    <td>{{getCategoryName(+item.category)}}</td>
                    <td>
                      <span class="badge badge-danger" v-if="item.type === 'outcome'">Расход</span>
                      <span class="badge badge-success" v-if="item.type === 'income'">Доход</span>
                    </td>
                    <td class="text-lg-center">
                      <router-link
                        class="btn btn-primary-outline"
                        :to="{name: 'historyItem', params: {id: item.id}}"
                      >Открыть</router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-12">
          <nav>
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#" @click.prevent="page !== 1 ? page-- : page === 1">Previous</a>
              </li>
              <li class="page-item" v-for="(item, index) in pages" :key="index">
                <a href="#" class="page-link" @click.prevent="page = index + 1">{{item}}</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" @click.prevent="page !== pages.length ? page++ : page === pages.length">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  data() {
    return {
      // paginate
      perPage: 5,
      pages: [],
      page: 1
      // /paginate
    };
  },
  computed: {
    events() {
      return this.$store.state.events;
    },
    categories() {
      return this.$store.state.categories;
    },

    // paginate
    displayedPosts() {
      return this.paginate(this.events);
    }
    // /paginate
  },
  methods: {
    getEvents() {
      this.$store.dispatch("getEvents");
    },
    getCategories() {
      this.$store.dispatch("getCategories");
    },
    getCategoryName(id) {
      return this.categories
        .filter(item => {
          return item.id === id;
        })
        .map(item => item.name)[0];
    },

    // paginate
    setPages() {
      let numberOfPages = Math.ceil(this.events.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return posts.slice(from, to);
    }
    // /paginate
  },
  watch: {
    // paginate
    events() {
      this.setPages();
    }
    // /paginate
  },
  created() {
    this.getEvents();
    this.getCategories();
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  justify-content: center;
}
</style>
