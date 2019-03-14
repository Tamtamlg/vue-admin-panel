<template>
  <div class="card">
    <header class="auth-header">
      <h1 class="auth-title">
        <div class="logo">
          <span class="l l1"></span>
          <span class="l l2"></span>
          <span class="l l3"></span>
          <span class="l l4"></span>
          <span class="l l5"></span>
        </div>
      </h1>
    </header>
    <div class="auth-content">
      <p class="text-xs-center">Войдите для работы</p>
      <form @submit.prevent="onLogin">
        <div class="form-group" :class="{'is-invalid': errors.first('email')}">
          <label for="email">Email</label>
          <input
            type="email"
            class="form-control underlined"
            id="email"
            placeholder="Введите ваш email"
            v-model="email"
            name="email"
            v-validate="'required|email'"
          >
          <span class="invalid-text" v-if="errors.first('email')">Некорректный email</span>
        </div>
        <div class="form-group" :class="{'is-invalid': errors.first('password')}">
          <label for="password">Пароль</label>
          <input
            type="password"
            class="form-control underlined"
            id="password"
            placeholder="Пароль"
            name="password"
            v-model="password"
            v-validate="'required|min:8'"
          >
          <span class="invalid-text" v-if="errors.first('password')">Минимум 8 символов</span>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-block btn-primary" :disabled="!isFormValid || loading">Войти</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      email: ""
    };
  },
  computed: {
    isFormValid() {
      return !Object.keys(this.fields).some(key => this.fields[key].invalid);
    },
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    onLogin() {
      this.$store.dispatch("onLogin", { email: this.email, password: this.password }).then(() => {
        this.$router.push('/')
      });
    }
  },
  created() {
    if(this.$route.query['loginError']) {
      this.flash('Требуется авторизация', 'error', {timeout: 3000});
    }
  }
};
</script>

<style lang="scss" scoped>
.form-group {
  position: relative;
  margin-bottom: 20px;
}
.is-invalid {
  input.form-control {
    border-color: red;
    &:focus {
      border-color: red;
    }
  }
  .form-group__label {
    color: red;
  }
}

.invalid-text {
  position: absolute;
  top: 100%;
  color: red;
  display: inline-block;
  font-size: 12px;
}
</style>
