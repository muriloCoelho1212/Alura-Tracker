<template>
    <section class="projetos">
        <h1 class="title">Projetos</h1>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeProjeto" class="label">Nome do projeto</label>
                <input type="text" class="input" v-model="nomeProjeto" id="noemProjeto">
            </div>
            <div class="field">
                <button type="submit" class="button">Salvar</button>
            </div>
        </form>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(projeto) in projetos" :key="projeto.id">
                    <td>{{ projeto.id }}</td>
                    <td>{{ projeto.nome }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    import IProjeto from '../interfaces/Iprojeto'

    export default defineComponent({
        name: 'ProjetosView',
        data(){
            return {
                nomeProjeto: '',
                projetos: [] as IProjeto[]
            }
        },
        methods: {
            salvar(){
                const projeto: IProjeto = {
                    nome: this.nomeProjeto,
                    id: new Date().toLocaleString()
                }
                this.projetos.push(projeto)
                this.nomeProjeto = ''
            }
        }
    })
</script>
<style scoped>
    .projetos {
        padding: 1.25rem;
    }
</style>