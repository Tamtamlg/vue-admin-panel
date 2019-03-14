import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token') || '',
    loading: false,
    endRequest: true,
    menuLinks: [{
        name: "Счет",
        route: "bill",
        icon: "building-o"
      },
      {
        name: "Записи",
        route: "records",
        icon: "plus-square"
      },
      {
        name: "Планирование",
        route: "planning",
        icon: "archive"
      },
      {
        name: "История",
        route: "history",
        icon: "flash"
      }
    ],
    currency: [],
    privatBankApi: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
    api: 'http://localhost:3000/',
    bills: 0,
    categories: [],
    events: [],
    userName: ''
  },
  mutations: {
    request(state, payload) {
      state.endRequest = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    clearError(state) {
      state.error = null
    },
    setCurrency(state, payload) {
      state.currency = payload;
    },
    setBills(state, payload) {
      state.bills = payload;
    },
    setCategories(state, payload) {
      state.categories = payload;
    },
    setEvents(state, payload) {
      state.events = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
    setUserName(state, payload) {
      state.userName = payload;
    }
  },
  actions: {
    onLogin({
      state,
      commit
    }, payload) {

      commit('clearError');
      commit('setLoading', true);

      return new Promise((resolve, reject) => {
        commit('request', false);
        axios.get(state.api + 'users', {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          const user = response.data.find(item => {
            return item.email === payload.email && item.password === payload.password;
          })
          if (user) {
            commit('setUserName', user.name);
            if (response.data.token) {
              const token = response.data.token;
              localStorage.setItem('user-token', token);
              commit('setToken', token);
              // axios.defaults.headers.common['Authorization'] = token;
            } else {
              const token = 'random_string_token_1234567890';
              localStorage.setItem('user-token', token);
              commit('setToken', token);
              // axios.defaults.headers.common['Authorization'] = token;
            }
            resolve(response);
          } else {
            Vue.prototype.$flashStorage.flash('Неверный email или пароль', 'error', {
              timeout: 3000
            });
          }
          commit('setLoading', false);
          commit('request', true);
        }).catch((error) => {
          commit('setLoading', false)
          Vue.prototype.$flashStorage.flash(error.message, 'error');
          reject(error)
        });
      });
    },

    onLogout({
      commit
    }) {
      return new Promise((resolve) => {
        localStorage.removeItem('user-token');
        commit('setToken', '');
        resolve();
      });
    },

    async getCurrensy({
      state,
      commit
    }) {
      commit('clearError');
      commit('setLoading', true);
      try {
        commit('request', false);
        await axios.get(state.privatBankApi).then(response => {
          commit('setCurrency', response.data)

          try {
            axios.get(state.api + 'bill').then(response => {
              commit('setBills', response.data.value)
            }).catch(error => {
              Vue.prototype.$flashStorage.flash(error.message, 'error', {
                timeout: 3000
              });
            });
          } catch (error) {
            Vue.prototype.$flashStorage.flash(error.message, 'error', {
              timeout: 3000
            });
          }

        });
        commit('setLoading', false);
        commit('request', true);
      } catch (error) {
        commit('setLoading', false)
        Vue.prototype.$flashStorage.flash(error.message, 'error', {
          timeout: 3000
        });
      }
    },

    async getCategories({
      state,
      commit
    }) {
      commit('clearError');
      commit('setLoading', true);
      try {
        commit('request', false);
        await axios.get(state.api + 'categories').then(response => {
          commit('setCategories', response.data)
        });
        commit('setLoading', false);
        commit('request', true);
      } catch (error) {
        commit('setLoading', false)
        Vue.prototype.$flashStorage.flash(error.message, 'error', {
          timeout: 3000
        });
      }
    },

    async getEvents({
      state,
      commit
    }) {
      commit('clearError');
      commit('setLoading', true);
      try {
        commit('request', false);
        await axios.get(state.api + 'events').then(response => {
          commit('setEvents', response.data)
        });
        commit('setLoading', false);
        commit('request', true);
      } catch (error) {
        commit('setLoading', false)
        Vue.prototype.$flashStorage.flash(error.message, 'error', {
          timeout: 3000
        });
      }
    },

    async addCategory({
      state,
      commit,
      dispatch
    }, payload) {
      commit('clearError');
      commit('setLoading', true);
      try {
        commit('request', false);
        const requestData = {
          "name": payload.name,
          "capacity": payload.capacity
        }
        await axios.post(state.api + 'categories', requestData, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(() => {
          dispatch('getCategories');
          Vue.prototype.$flashStorage.flash('Данные успешно добавлены', 'success', {
            timeout: 3000
          });
        });
        commit('setLoading', false);
        commit('request', true);
      } catch (error) {
        commit('setLoading', false)
        Vue.prototype.$flashStorage.flash(error.message, 'error', {
          timeout: 3000
        });
      }
    },

    async editCategory({
      state,
      commit,
      dispatch
    }, payload) {
      commit('clearError');
      commit('setLoading', true);
      try {
        commit('request', false);
        const requestData = {
          "id": payload.id,
          "name": payload.name,
          "capacity": payload.capacity
        }
        await axios.put(state.api + `categories/${payload.id}`, requestData, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(() => {
          dispatch('getCategories');
          Vue.prototype.$flashStorage.flash('Данные успешно изменены', 'success', {
            timeout: 3000
          });
        });
        commit('setLoading', false);
        commit('request', true);
      } catch (error) {
        commit('setLoading', false)
        Vue.prototype.$flashStorage.flash(error.message, 'error', {
          timeout: 3000
        });
      }
    },

    async delCategory({
      state,
      commit,
      dispatch
    }, payload) {
      commit('clearError');
      commit('setLoading', true);
      try {
        commit('request', false);
        await axios.delete(state.api + `categories/${payload.id}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(() => {
          dispatch('getCategories');
          Vue.prototype.$flashStorage.flash('Данные успешно удалены', 'success', {
            timeout: 3000
          });
        });
        commit('setLoading', false);
        commit('request', true);
      } catch (error) {
        commit('setLoading', false)
        Vue.prototype.$flashStorage.flash(error.message, 'error', {
          timeout: 3000
        });
      }
    },

    async addEvent({
      state,
      commit
    }, payload) {
      commit('clearError');
      commit('setLoading', true);
      try {
        commit('request', false);
        const requestData = {
          type: payload.type,
          amount: payload.amount,
          category: payload.category,
          date: payload.date,
          description: payload.description
        }
        let newBill;
        if (payload.type === 'outcome') {
          newBill = state.bills - payload.amount;
        } else {
          newBill = state.bills + payload.amount;
        }
        await axios.post(state.api + `events`, requestData, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(() => {
          Vue.prototype.$flashStorage.flash('Данные успешно добавлены', 'success', {
            timeout: 3000
          });

          try {
            axios.put(state.api + 'bill', {
              value: newBill,
              currency: 'UAH'
            }).then(response => {
              commit('setBills', response.data.value)
            }).catch(error => {
              Vue.prototype.$flashStorage.flash(error.message, 'error', {
                timeout: 3000
              });
            });
          } catch (error) {
            Vue.prototype.$flashStorage.flash(error.message, 'error', {
              timeout: 3000
            });
          }


        });
        commit('setLoading', false);
        commit('request', true);
      } catch (error) {
        commit('setLoading', false)
        Vue.prototype.$flashStorage.flash(error.message, 'error', {
          timeout: 3000
        });
      }
    },

  }
})