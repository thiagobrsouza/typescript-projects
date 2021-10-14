<template>
  <div id="providers">
    <h3>Menu de Fornecedores</h3>
    <hr>

    <div class="row">
      <router-link to="/provider-add" class="btn btn-primary">Novo fornecedor</router-link>
    </div>

    <table class="mt-4 table table-striped table-hover table-sm">
      <thead class="thead-dark">
        <tr>
          <th>Código</th>
          <th>Nome fornecedor</th>
          <th>CNPJ</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="provider in providers" :key="provider.id">
          <td>{{ provider.id }}</td>
          <td>{{ provider.name }}</td>
          <td>{{ provider.cnpj }}</td>
          <td>
            <router-link :to="{name: 'ProviderUpdate', params: {id: provider.id} }" class="btn btn-success">Editar</router-link>
            <button class="btn btn-danger ml-3">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'providers',
  computed: {
    ...mapState({
      providers: state => state.moduleProvider.providers,
    })
  },
  methods: {
    ...mapActions('moduleProvider', ['getProviders', 'selectProvider']),
  },
  created() {
    this.$store.dispatch('moduleProvider/getProviders')
  }
}
</script>

<style>

</style>