import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    endRequest: true,
    error: null,
    message: '',
    menuLinks: [
      {
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
    events: []
  },
  mutations: {
    request (state, payload) {
      state.endRequest = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setMessage(state, payload) {
      state.message = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError (state) {
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
    }
  },
  actions: {
    clearMessage({commit}) {
      setTimeout(() => {
        commit('setMessage', '')
        commit('clearError');
      }, 5000);
    },

    async getCurrensy({state, commit, dispatch}) {
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
              commit('setError', true)
              commit('setMessage', error.message)
              dispatch('clearMessage');
            });
          } catch (error) {
            commit('setError', true)
            commit('setMessage', error.message)
            dispatch('clearMessage');
          }

        });
        commit('setLoading', false);
        commit('request', true);
      } catch (error) {
        commit('setLoading', false)
        commit('setError', true)
        commit('setMessage', error.message);
        dispatch('clearMessage');
      }
    },

    async getCategories({state, commit, dispatch}) {
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
        commit('setError', true)
        commit('setMessage', error.message);
        dispatch('clearMessage');
      }
    },

    async getEvents({state, commit, dispatch}) {
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
        commit('setError', true)
        commit('setMessage', error.message);
        dispatch('clearMessage');
      }
    },

    async addCategory({state, commit, dispatch}, payload) {
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
          commit('setMessage', 'Данные успешно добавлены')
          dispatch('clearMessage');
        });
        commit('setLoading', false);
        commit('request', true);
      } catch (error) {
        commit('setLoading', false)
        commit('setError', true)
        commit('setMessage', error.message)
        dispatch('clearMessage');
      }
    },

    async editCategory({state, commit, dispatch}, payload) {
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
          commit('setMessage', 'Данные успешно изменены')
          dispatch('clearMessage');
        });
        commit('setLoading', false);
        commit('request', true);
      } catch (error) {
        commit('setLoading', false)
        commit('setError', true)
        commit('setMessage', error.message)
        dispatch('clearMessage');
      }
    },

    async delCategory({state, commit, dispatch}, payload) {
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
          commit('setMessage', 'Данные успешно удалены')
          dispatch('clearMessage');
        });
        commit('setLoading', false);
        commit('request', true);
      } catch (error) {
        commit('setLoading', false)
        commit('setError', true)
        commit('setMessage', error.message)
        dispatch('clearMessage');
      }
    },

    async addEvent({state, commit, dispatch}, payload) {
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
        const newBill = payload.type === 'outcom' ? state.bills + payload.amount : state.bills - payload.amount;
        await axios.post(state.api + `events`, requestData, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(() => {
          commit('setMessage', 'Данные успешно добавлены')
          dispatch('clearMessage');

          try {
            axios.put(state.api + 'bill', {value: newBill, currency: 'UAH'}).then(response => {
              commit('setBills', response.data.value)
            }).catch(error => {
              commit('setError', true)
              commit('setMessage', error.message)
              dispatch('clearMessage');
            });
          } catch (error) {
            commit('setError', true)
            commit('setMessage', error.message)
            dispatch('clearMessage');
          }


        });
        commit('setLoading', false);
        commit('request', true);
      } catch (error) {
        commit('setLoading', false)
        commit('setError', true)
        commit('setMessage', error.message)
        dispatch('clearMessage');
      }
    },

  }
})
