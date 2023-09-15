import IProjeto from "@/interfaces/Iprojeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, DEFINIR_PROJETO, EDITA_PROJETO, EXCLUI_PROJETO, NOTIFICAR } from "./mutations";
import { INotificacoes } from "@/interfaces/Inotificacoes";
import { ALTERAR_PROJETOS, CADASTRAR_PROJETOS, OBTER_PROJETOS, REMOVER_PROJETOS } from "./tipo-acoes";
import http from "@/http";

interface Estado {
    projetos: IProjeto[]
    notificacoes: INotificacoes[]
}

export const key: InjectionKey<Store<Estado>> = Symbol() 

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: []
    },
    mutations: {
        [ADICIONA_PROJETO] (state, nomeProjeto: string){
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [EDITA_PROJETO] (state, projeto: IProjeto){
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUI_PROJETO] (state, id: string){
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [DEFINIR_PROJETO](state, projetos: IProjeto[]){
            state.projetos = projetos
        },
        [NOTIFICAR] (state, novaNotificacao: INotificacoes){
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3500)
        }
    },
    actions: {
        [OBTER_PROJETOS] ({ commit }): void{
            http.get('projetos')
                .then(res => commit(DEFINIR_PROJETO, res.data))
        },
        [CADASTRAR_PROJETOS](contexto, nomeProjeto: string){
            return http.post('projetos', {
                nome: nomeProjeto
            })
        },
        [ALTERAR_PROJETOS](contexto, projeto: IProjeto){
            return http.put(`projetos/${projeto.id}`, projeto)
        },
        [REMOVER_PROJETOS]({ commit }, idProjeto: string){
            return http.delete(`projetos/${idProjeto}`)
                .then(() => commit(EXCLUI_PROJETO, idProjeto))
        }
    }
})

export function useStore(): Store<Estado>{
    return vuexUseStore(key)
}