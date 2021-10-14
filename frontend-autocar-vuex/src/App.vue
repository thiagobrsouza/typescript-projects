<template>
  <div id="app">
    <Menu />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Menu from './components/Menu.vue'

export default {
  name: 'app',
  components: {
    Menu
  }
}
</script>

<style>

</style>
