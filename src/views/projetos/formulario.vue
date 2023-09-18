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
import { defineComponent } from 'vue';
import { useStore } from '@/store'
import { TipoNotificacao } from '@/interfaces/Inotificacoes';
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETOS, CADASTRAR_PROJETOS } from '@/store/tipo-acoes';

export default defineComponent({
    name: 'FormView',
    props: {
        id: {
            type: String
        }
    },
    mounted() {
        if (this.id) {
            const projeto = this.store.state.projeto.projetos.find(proj => proj.id == this.id)
            this.nomeProjeto = projeto?.nome || ''
        }
    },
    data() {
        return {
            nomeProjeto: ''
        }
    },
    methods: {
        salvar() {
            if (this.id) {
                this.store.dispatch(ALTERAR_PROJETOS, {
                    id: this.id,
                    nome: this.nomeProjeto
                }).then(() => this.comSucesso())
            } else {
                this.store.dispatch(CADASTRAR_PROJETOS, this.nomeProjeto)
                    .then(() => this.comSucesso())
            }
        },
        comSucesso() {
            this.nomeProjeto = ''
            this.notificar(TipoNotificacao.SUCESSO, 'Excelente!', 'Seu projeto foi adicionado a lista com sucesso!')
            this.$router.push('/projetos')
        }
    },
    setup() {
        const store = useStore()
        const { notificar } = useNotificador()
        return {
            store,
            notificar
        }
    }
})
</script>