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
        name: "История",
        route: "history",
        icon: "flash"
      },
      {
        name: "Планирование",
        route: "planning",
        icon: "archive"
      },
      {
        name: "Запись",
        route: "records",
        icon: "plus-square"
      }
    ],
    currency: [],
    privatBankApi: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
    api: 'http://localhost:3000/',
    bills: 0,
    categories: []
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

  }
})
