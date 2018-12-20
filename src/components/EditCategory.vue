<template>
  <div class="card h-100">
    <div class="card-header bordered">
      <div class="header-block">
        <h3 class="title">Редактировать категорию</h3>
      </div>
    </div>
    <div class="card-block">
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label class="control-label" for="category">Выберите категорию</label>
          <select class="form-control" id="edit-category" v-model="activeCategory" @change="changeSelect">
            <option v-for="item in categories" :key="item.id">{{item.name}}</option>
          </select>
        </div>
        <div class="form-group">
          <label class="control-label" for="category-name">Введите название</label>
          <input type="text" id="edit-category-name" class="form-control" v-model="activeCategoryName">
        </div>
        <div class="form-group">
          <label class="control-label" for="category-value">Введите лимит</label>
          <input type="number" value="0" id="edit-category-value" class="form-control" v-model="activeCategoryCapacity">
        </div>
        <button type="submit" class="btn btn-primary">Изменить</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeCategory: '',
      activeCategoryName: '',
      activeCategoryCapacity: ''
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
    selectedCategoryName() {
      return this.$store.state.categories.filter(item => {
        return item.name === this.activeCategory;
      }).map(item => item.name)[0]
    },
    selectedCategoryCapacity() {
      return this.$store.state.categories.filter(item => {
        return item.name === this.activeCategory;
      }).map(item => item.capacity)[0]
    },
    selectedCategoryId() {
      return this.$store.state.categories.filter(item => {
        return item.name === this.activeCategory;
      }).map(item => item.id)[0]
    }
  },
  methods: {
    editCategory() {
      this.$store.dispatch('editCategory', {
        id: this.selectedCategoryId,
        name: this.activeCategoryName,
        capacity: this.activeCategoryCapacity
      });
    },
    changeSelect() {
      this.activeCategoryName = this.selectedCategoryName;
      this.activeCategoryCapacity = this.selectedCategoryCapacity;
    },
    clearForm() {
      this.activeCategoryName = '';
      this.activeCategoryCapacity = '';
      this.activeCategory = '';
    },
    onSubmit() {
      this.editCategory();
      this.clearForm();
    }
  }
};
</script>

<style>
</style>
