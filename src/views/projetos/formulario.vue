<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeProjeto" class="label">Nome do projeto</label>
                <input type="text" class="input" v-model="nomeProjeto" id="nomeProjeto">
            </div>
            <div class="field">
                <button type="submit" class="button">Salvar</button>
            </div>
        </form>
    </section>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store'
import { TipoNotificacao } from '@/interfaces/Inotificacoes';
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETOS, CADASTRAR_PROJETOS } from '@/store/tipo-acoes';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'FormView',
    props: {
        id: {
            type: String
        }
    },
    setup(props) {
        const router = useRouter()

        const store = useStore()
        const { notificar } = useNotificador()

        const nomeProjeto = ref("")

        if (props.id) {
            const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id)
            nomeProjeto.value = projeto?.nome || ''
        }

        const comSucesso = () => {
            nomeProjeto.value = ''
            notificar(TipoNotificacao.SUCESSO, 'Excelente!', 'Seu projeto foi adicionado a lista com sucesso!')
            router.push('/projetos')
        }

        const salvar = () => {
            if (props.id) {
                store.dispatch(ALTERAR_PROJETOS, {
                    id: props.id,
                    nome: nomeProjeto.value
                }).then(() => comSucesso())
            } else {
                store.dispatch(CADASTRAR_PROJETOS, nomeProjeto.value)
                    .then(() => comSucesso())
            }
        }


        return {
            nomeProjeto,
            salvar
        }
    }
})
</script>