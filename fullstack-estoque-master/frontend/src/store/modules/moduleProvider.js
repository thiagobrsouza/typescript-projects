import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/providers'
});

const moduleProvider = {

  namespaced: true,

  state: () => ({
    providers: [],
    provider: {
      id: null,
      name: '',
      cnpj: ''
    }
  }),

  mutations: {
    getProviders(state, providers) {
      state.providers = providers;
    },
    addProvider(state, provider) {
      state.provider = provider;
    },
    selectProvider(state, provider) {
      state.provider = provider;
    },
    updateProvider(state, provider) {
      state.provider = provider;
    }
  },

  actions: {
    getProviders({ commit }) {
      http.get('/').then(response => {
        console.log(response.data);
        commit('getProviders', response.data);
      });
    },
    addProvider({ commit }, provider) {
      http.post('/', provider).then(response => {
        console.log(response.data);
        commit('addProvider', provider);
      });
    },
    selectProvider({ commit }, id) {
      http.get('/' + id).then(response => {
        console.log(response.data);
        commit('selectProvider', response.data);
      });
    },
    updateProviderById({ commit }, provider) {
      http.put('/' + provider.id, provider).then(response => {
        console.log(response.data);
        commit('updateProvider', response.data);
      });
    }
  }

}

export default moduleProvider;