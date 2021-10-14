<template>
  <div id="providerAdd">
    <h3>Cadastro de Fornecedores</h3>
    <hr>

    <form @submit.prevent="save()">
      <div class="form-group row">
        <label for="name" class="col-sm-2 col-form-label">Nome fornecedor:</label>
        <input type="text" id="name" class="form-control col-sm-5" v-model="provider.name" required>
      </div>
      <div class="form-group row">
        <label for="cnpj" class="col-sm-2 col-form-label">CNPJ:</label>
        <input type="text" id="cnpj" class="form-control col-sm-5" v-model="provider.cnpj" required>
      </div>
      <button type="submit" class="btn btn-primary">Salvar Fornecedor</button>
    </form>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'providerAdd',
  computed: {
    ...mapState({
      provider: state => state.moduleProvider.provider,
    })
  },
  methods: {
    ...mapActions('moduleProvider', ['addProvider']),
    save() {
      this.addProvider(this.provider);
      this.provider = {}
      alert('Fornecedor salvo com sucesso!');
    }
  }
}
</script>

<style>

</style>