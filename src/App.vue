<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <BarraLateral/>
    </div>
    <div class="column is-three-quarter">
      <FormPrincipal/>
    </div>
  </main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import BarraLateral from './components/barraLateral.vue';
  import FormPrincipal from './components/formulario.vue'

  export default defineComponent({
      name: 'App',
      components: { 
        BarraLateral,
        FormPrincipal
      }
  });
</script>

<style>

</style>
