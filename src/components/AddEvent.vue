<template>
  <div class="card h-100">
    <div class="card-header bordered">
      <div class="header-block">
        <h3 class="title">Добавить событие</h3>
      </div>
    </div>
    <div class="card-block">
      <form>
        <div class="form-group">
          <label class="control-label" for="category">Выберите категорию</label>
          <select class="form-control" id="category" v-model="activeCategory">
            <option v-for="item in categories" :key="item.id">{{item.name}}</option>
          </select>
        </div>
        <div class="form-group">
          <label class="control-label">Выберите тип</label>
          <div>
            <label>
              <input class="radio" name="radios" type="radio">
              <span>Доход</span>
            </label>
          </div>
          <div>
            <label>
              <input class="radio" name="radios" type="radio" checked>
              <span>Расход</span>
            </label>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label" for="amount">Введите сумму</label>
          <input type="number" value="0" id="amount" class="form-control">
        </div>
        <button type="submit" class="btn btn-primary">Добавить</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeCategory: ''
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
    // selectedCategory() {
    //   return this.$store.state.categories.filter(item => {
    //     return item.name === this.activeCategory;
    //   })
    // }
  },
  methods: {
    getCategories() {
      this.$store.dispatch('getCategories');
    }
  },
  created() {
    this.getCategories();
  }
};
</script>

<style>
</style>
