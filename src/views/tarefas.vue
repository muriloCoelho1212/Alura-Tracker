<template>
    <div class="column is-three-quarter conteudo">
    <FormPrincipal @aoSalvarTarefa="salvarTarefa"/>
    <div class="lista">
        <Box v-if="listaEstaVazia">
        Você não está muito produtivo hoje...
        </Box>
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
    </div>
    </div>
</template>
  
<script lang="ts">
    import { defineComponent } from 'vue';
    import FormPrincipal from '../components/formulario.vue'
    import Tarefa from '../components/tarefa.vue';
    import ITarefa from '../interfaces/Itarefa'
    import Box from '../components/box.vue';
  
    export default defineComponent({
        name: 'TarefasView',
        components: {
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