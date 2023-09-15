<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }" style="height: 100%;">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <Notificacoes />
      <RouterView></RouterView>
    </div>
  </main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import BarraLateral from './components/barraLateral.vue';
  import Notificacoes from './components/notificacoes.vue';

  export default defineComponent({
      name: 'App',
      components: {
        BarraLateral,
        Notificacoes
    },
    data(){
      return {
        modoEscuroAtivo: false
      }
    },
    methods: {
      trocarTema(modoEscuroAtivo: boolean){
        this.modoEscuroAtivo = modoEscuroAtivo
      }
    }
  });
</script>

<style scoped>
  .lista{
    padding: 1.25rem;
  }
  main{
    --bg-primary: #fff;
    --text-primary: #000;
    --bg-box: #d6d6d6;
  }
  main.modo-escuro{
    --bg-primary: #2b2d42;
    --text-primary: #ddd;
    --bg-box: #485383;
  }
  #app{
    background-color: var(--bg-primary);
  }
  .conteudo{
    background-color: var(--bg-primary);
  }
  @media only screen and (max-width: 768px){
    .conteudo{
      height: 100%;
    }
  }
</style>
