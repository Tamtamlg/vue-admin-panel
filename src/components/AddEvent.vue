<template>
  <div class="card h-100">
    <div class="card-header bordered">
      <div class="header-block">
        <h3 class="title">Добавить событие</h3>
      </div>
    </div>
    <div class="card-block">
      <form @submit.prevent="onSubmit">
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
              <input class="radio" type="radio" value="income" v-model="type">
              <span>Доход</span>
            </label>
          </div>
          <div>
            <label>
              <input class="radio" type="radio" value="outcome" v-model="type">
              <span>Расход</span>
            </label>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label" for="amount">Введите сумму</label>
          <input type="number" id="amount" class="form-control" v-model="amount">
        </div>
        <div class="form-group">
          <label class="control-label" for="amount">Введите описание</label>
          <input type="text" id="description" class="form-control" v-model="description">
        </div>
        <button type="submit" class="btn btn-primary">Добавить</button>
      </form>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      activeCategory: '',
      type: 'outcome',
      amount: '',
      description: ''
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
    selectedCategoryId() {
      return this.$store.state.categories.filter(item => {
        return item.name === this.activeCategory;
      }).map(item => item.id)[0]
    }
  },
  methods: {
    getCategories() {
      this.$store.dispatch('getCategories');
    },
    addEvent() {
      this.$store.dispatch('addEvent', {
        type: this.type,
        amount: +this.amount,
        category: this.selectedCategoryId,
        date: moment(new Date).format('DD.MM.YYYY HH:MM:SS'),
        description: this.description
      });
    },
    getCurrensy() {
      this.$store.dispatch("getCurrensy");
    },
    clearForm() {
      this.type = 'outcome';
      this.amount = '';
      this.category = '';
      this.description = '';
    },
    onSubmit() {
      this.addEvent();
      this.clearForm();
    }
  },
  created() {
    this.getCategories();
    this.getCurrensy();
  }
};
</script>

<style>
</style>
