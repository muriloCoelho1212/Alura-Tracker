import http from "@/http";
import IProjeto from "@/interfaces/Iprojeto";
import { Estado } from "@/store";
import { ADICIONA_PROJETO, EDITA_PROJETO, EXCLUI_PROJETO, DEFINIR_PROJETO } from "@/store/mutations";
import { OBTER_PROJETOS, CADASTRAR_PROJETOS, ALTERAR_PROJETOS, REMOVER_PROJETOS } from "@/store/tipo-acoes";
import { Module } from "vuex";

export interface EstadoDoProjeto {
    projetos: IProjeto[]
}

export const projeto: Module<EstadoDoProjeto, Estado> = {
    mutations: {
        [ADICIONA_PROJETO](state, nomeProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [EDITA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUI_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [DEFINIR_PROJETO](state, projetos: IProjeto[]) {
            state.projetos = projetos
        },
    },
    actions: {
        [OBTER_PROJETOS]({ commit }): void {
            http.get('projetos')
                .then(res => commit(DEFINIR_PROJETO, res.data))
        },
        [CADASTRAR_PROJETOS](contexto, nomeProjeto: string) {
            return http.post('projetos', {
                nome: nomeProjeto
            })
        },
        [ALTERAR_PROJETOS](contexto, projeto: IProjeto) {
            return http.put(`projetos/${projeto.id}`, projeto)
        },
        [REMOVER_PROJETOS]({ commit }, idProjeto: string) {
            return http.delete(`projetos/${idProjeto}`)
                .then(() => commit(EXCLUI_PROJETO, idProjeto))
        },
    }
}