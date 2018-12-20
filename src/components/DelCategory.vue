<template>
  <div class="card h-100">
    <div class="card-header bordered">
      <div class="header-block">
        <h3 class="title">Удалить категорию</h3>
      </div>
    </div>
    <div class="card-block">
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label class="control-label" for="category">Выберите категорию</label>
          <select class="form-control" id="edit-category" v-model="activeCategory">
            <option v-for="item in categories" :key="item.id">{{item.name}}</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Удалить</button>
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
    selectedCategoryId() {
      return this.$store.state.categories.filter(item => {
        return item.name === this.activeCategory;
      }).map(item => item.id)[0]
    }
  },
  methods: {
    delCategory() {
      this.$store.dispatch('delCategory', {
        id: this.selectedCategoryId
      });
    },
    clearForm() {
      this.activeCategory = '';
    },
    onSubmit() {
      this.delCategory();
      this.clearForm();
    }
  }
};
</script>

<style>
</style>
