import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import TarefasView from '../views/tarefas.vue'
import ProjetosView from '../views/projetos.vue'

const routes: RouteRecordRaw[] = [{
    path: '/',
    name: 'Tarefas',
    component: TarefasView
}, {
    path: '/Projetos',
    name: 'Projetos',
    component: ProjetosView
}]
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router