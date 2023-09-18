import http from "@/http";
import ITarefa from "@/interfaces/Itarefa";
import { Estado } from "@/store";
import { DEFINIR_TAREFAS, ADICIONA_TAREFA, EDITA_TAREFA } from "@/store/mutations";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFAS } from "@/store/tipo-acoes";
import { Module } from "vuex";

export interface EstadoDaTarefa {
    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoDaTarefa, Estado> = {
    state: {
        tarefas: []
    },
    mutations: {
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [EDITA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(tarefa => tarefa.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
    },
    actions: {
        [OBTER_TAREFAS]({ commit }, filtro: string): void {
            let url = 'tarefas'
            if(filtro){
                url += '?descricao=' + filtro
            }
            http.get(url)
                .then(res => commit(DEFINIR_TAREFAS, res.data))
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.post('tarefas', tarefa)
                .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
        },
        [ALTERAR_TAREFAS]({ commit }, tarefa: ITarefa) {
            return http.put(`tarefas/${tarefa.id}`, tarefa)
                .then(() => commit(EDITA_TAREFA, tarefa))
        },
    }
}