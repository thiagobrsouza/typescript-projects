<template>
  <div id="providerDetail">
    <h3>Detalhes de Fornecedores</h3>
    <hr>

    <form @submit.prevent="updateProvider(provider)">
      <div class="form-group row">
        <label for="name" class="col-sm-2 col-form-label">Nome fornecedor:</label>
        <input type="text" id="name" class="form-control col-sm-5" v-model="provider.name" required>
      </div>
      <div class="form-group row">
        <label for="cnpj" class="col-sm-2 col-form-label">CNPJ:</label>
        <input type="text" id="cnpj" class="form-control col-sm-5" v-model="provider.cnpj" required>
      </div>
      <div class="form-group row">
        <label for="createdAt" class="col-sm-2 col-form-label">Data de criação:</label>
        <input type="text" id="createdAt" class="form-control col-sm-5" :value="provider.createdAt" readonly>
      </div>
      <div class="form-group row">
        <label for="updatedAt" class="col-sm-2 col-form-label">Última atualização:</label>
        <input type="text" id="updatedAt" class="form-control col-sm-5" :value="provider.updatedAt" readonly>
      </div>
      <button type="submit" class="btn btn-primary">Atualizar</button>
      <router-link class="btn btn-warning ml-5" to="/providers">Voltar</router-link>
    </form>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'providerDetail',
  data() {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    ...mapState({
      provider: state => state.moduleProvider.provider
    })
  },
  methods: {
    ...mapActions('moduleProvider', ['selectProvider', 'updateProviderById']),
    updateProvider(provider) {
      const update = {
        id: provider.id,
        name: provider.name,
        cnpj: provider.cnpj
      };
      this.updateProviderById(update);
      alert('Editado com sucesso!');
    },
  },
  created() {
    this.selectProvider(this.$route.params.id)
  }
}
</script>

<style>

</style>