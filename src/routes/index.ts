import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import TarefasView from '../views/tarefas.vue'
import ProjetosView from '../views/projetos.vue'
import listaVue from "../views/projetos/lista.vue"
import formularioVue from "@/views/projetos/formulario.vue"

const routes: RouteRecordRaw[] = [{
    path: '/',
    name: 'Tarefas',
    component: TarefasView
},{
    path: '/projetos',
    component: ProjetosView,
    children: [
        {
            path: '',
            name: 'Projetos',
            component: listaVue
        }, {
            path: 'novo',
            name: 'Novo Projeto',
            component: formularioVue
        }, {
            path: ':id',
            name: 'Editar Projeto',
            component: formularioVue,
            props: true
        },
    ]
}]
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router