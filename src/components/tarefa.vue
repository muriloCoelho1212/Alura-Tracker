<template>
    <Box>
        <div class="columns clicavel" @click="tarefaClicada">
            <div class="column is-4">
                {{ tarefa.descricao || 'Tarefa sem descrição' }}
            </div>
            <div class="column is-3">
                {{ tarefa.projeto?.nome || '' }}
            </div>
            <div class="column">
                <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
        </div>
    </Box>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Cronometro from './cronometro.vue';
import ITarefa from '@/interfaces/Itarefa';
import Box from './box.vue';

export default defineComponent({
    name: 'TarefaLista',
    emits: ['aoTarefaClicada'],
    components: {
        Cronometro,
        Box
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    setup(props, { emit }) {
        const tarefaClicada = (): void => {
            emit('aoTarefaClicada', props.tarefa)
        }

        const tempoGasto = (): string => {
            return new Date(props.tarefa.duracaoEmSegundos * 1000).toISOString().substring(19, 11)
        }

        return {
            tarefaClicada,
            tempoGasto
        }
    }
})

</script>
<style scoped>
.clicavel {
    cursor: pointer;
}
</style>