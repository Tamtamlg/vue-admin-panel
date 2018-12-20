<template>
  <article class="content">
    <div class="title-block">
      <h3 class="title">
        Страница записей
        <span class="sparkline bar"></span>
      </h3>
    </div>

    <section class="section">
      <div class="row">
        <div class="col-md-6 mb-3">
          <add-event></add-event>
        </div>
        <div class="col-md-6 mb-3">
          <add-category></add-category>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <edit-category></edit-category>
        </div>
        <div class="col-md-6 mb-3">
          <del-category></del-category>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import AddCategory from "@/components/AddCategory.vue";
import AddEvent from "@/components/AddEvent.vue";
import EditCategory from "@/components/EditCategory.vue";
import DelCategory from "@/components/DelCategory.vue";

export default {
  components: {
    AddCategory,
    AddEvent,
    EditCategory,
    DelCategory
  }
};
</script>
