<template>
  <div id="marcas">
    <h4 class="mt-3">Controle de fabricantes</h4>
    <hr>

    <form @submit.prevent="salvarMarca()">
      <div class="form-group row">
        <label for="nome" class="col-sm-2 col-form-label">Nome de fabricante:</label>
        <input type="text" class="col-sm-3 form-control" id="nome" v-model="marca.nome" required>
        <button type="submit" class="btn btn-primary col-sm-1 ml-3">Salvar</button>
      </div>
    </form>

    <table class="table table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th>Código</th>
          <th>Nome fabricante</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="marca in marcas" :key="marca.id">
          <td>{{ marca.id }}</td>
          <td>{{ marca.nome }}</td>
          <td>
            <button class="btn btn-primary" @click="selecionarMarca(marca)"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-danger ml-2"><i class="bi bi-trash"></i></button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'marcas',

  computed: {
    ...mapState({
      marcas: state => state.marcas.marcas,
      marca: state => state.marcas.marca
    })
  },

  methods: {
    ...mapActions('marcas', ['salvar', 'editar', 'listarMarcas', 'selecionarMarca']),
    salvarMarca() {
      if(!this.marca.id) {
        this.salvar(this.marca)
        alert('Salvo com sucesso!')
        this.listarMarcas()
      } else {
        this.editar(this.marca.id, this.marca)
        alert('Editado com sucesso')
        this.listarMarcas()
      }
    }
  },

  mounted() {
    this.$store.dispatch('marcas/listarMarcas')
  }
}
</script>

<style>

</style>