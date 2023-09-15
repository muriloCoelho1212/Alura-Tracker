<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeProjeto" class="label">Nome do projeto</label>
                <input type="text" class="input" v-model="nomeProjeto" id="noemProjeto">
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
    import { ADICIONA_PROJETO, EDITA_PROJETO } from '@/store/mutations';
    import { TipoNotificacao } from '@/interfaces/Inotificacoes';
    import useNotificador from '@/hooks/notificador'

    export default defineComponent({
        name: 'FormView',
        props: {
            id: {
                type: String
            }
        },
        mounted(){
            if(this.id){
                const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
                this.nomeProjeto = projeto?.nome || ''
            }
        },
        data(){
            return {
                nomeProjeto: ''
            }
        },
        methods: {
            salvar(){
                if(this.id){
                    this.store.commit(EDITA_PROJETO, {
                        id: this.id,
                        nome: this.nomeProjeto
                    })
                } else {
                    this.store.commit(ADICIONA_PROJETO, this.nomeProjeto)
                }
                this.nomeProjeto = '',
                this.notificar(TipoNotificacao.SUCESSO, 'Excelente!', 'Seu projeto foi adicionado a lista com sucesso!')
                this.$router.push('/projetos')
            },
        },
        setup(){
            const store = useStore()
            const { notificar } = useNotificador()
            return {
                store,
                notificar
            }
        }
    })
</script>