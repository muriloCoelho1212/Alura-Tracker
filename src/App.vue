<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <BarraLateral/>
    </div>
    <div class="column is-three-quarter">
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
        tarefas: [] as ITarefa[]
      }
    },
    methods: {
      salvarTarefa(tarefa: ITarefa){
        this.tarefas.push(tarefa)
      }
    },
    computed: {
      listaEstaVazia(): boolean{
        return this.tarefas.length === 0
      }
    }
  });
</script>

<style>
  .lista{
    padding: 1.25rem;
  }
</style>
