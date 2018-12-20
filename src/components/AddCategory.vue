<template>
  <div class="card h-100">
    <div class="card-header bordered">
      <div class="header-block">
        <h3 class="title">Добавить категорию</h3>
      </div>
    </div>
    <div class="card-block">
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label class="control-label" for="category-name">Введите название</label>
          <input type="text" id="category-name" class="form-control" v-model="name">
        </div>
        <div class="form-group">
          <label class="control-label" for="category-value">Введите лимит</label>
          <input type="number" value="0" id="category-value" class="form-control" v-model="capacity">
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
      name: '',
      capacity: ''
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('addCategory', {name: this.name, capacity: +this.capacity});
      this.name = '';
      this.capacity = '';
    }
  }
};
</script>

<style>
</style>
