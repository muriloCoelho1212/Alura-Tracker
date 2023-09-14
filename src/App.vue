<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <FormPrincipal @aoSalvarTarefa="salvarTarefa"/>
      <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
        <Box v-if="listaEstaVazia">
          Você não está muito produtivo hoje...
        </Box>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import BarraLateral from './components/barraLateral.vue';
  import FormPrincipal from './components/formulario.vue'
  import Tarefa from './components/tarefa.vue';
  import ITarefa from './interfaces/Itarefa'
  import Box from './components/box.vue';

  export default defineComponent({
      name: 'App',
      components: {
    BarraLateral,
    FormPrincipal,
    Tarefa,
    Box
},
    data(){
      return {
        tarefas: [] as ITarefa[],
        modoEscuroAtivo: false
      }
    },
    methods: {
      salvarTarefa(tarefa: ITarefa){
        this.tarefas.push(tarefa)
      },
      trocarTema(modoEscuroAtivo: boolean){
        this.modoEscuroAtivo = modoEscuroAtivo
      }
    },
    computed: {
      listaEstaVazia(): boolean{
        return this.tarefas.length === 0
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
  .conteudo{
    background-color: var(--bg-primary);
  }
</style>
