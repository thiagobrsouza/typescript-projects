import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/'
})


const state = () => ({
  marcas: [],
  marca: {
    id: null,
    nome: ''
  }
})

const getters = {}

const mutations = {
  listarMarcas(state, marcas) { state.marcas = marcas },
  salvar(state, marca) { state.marca = marca},
  selecionarMarca(state, id) { state.marca = id},
  limparFormulario(state) { state.marca = {}}
}

const actions = {
  listarMarcas({ commit }) {
    http.get('marcas').then(response => {
      commit('listarMarcas', response.data)
    })
  },
  salvar({ commit }, marca) {
    http.post('marcas', marca).then(response => {
      console.log(response.data)
      commit('salvar', marca)
      commit('limparFormulario')
    })
  },
  selecionarMarca({commit}, id) {
    commit('selecionarMarca', id)
    console.log(id)
  },
  editar({ commit }, {id, marca}) {
    http.put(`marcas/${id}`, marca).then(response => {
      console.log(response.data)
      commit('salvar', marca)
      console.log(marca)
      commit('limparFormulario')
    }).catch(e => {
      console.log(e.response.data)
    })
  }
}

export default {
  namespaced: true,
  state, getters, mutations, actions
}