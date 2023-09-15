import IProjeto from "@/interfaces/Iprojeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, EDITA_PROJETO, EXCLUI_PROJETO, NOTIFICAR } from "./mutations";
import { INotificacoes } from "@/interfaces/Inotificacoes";

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
        [NOTIFICAR] (state, novaNotificacao: INotificacoes){
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3500)
        }
    }
})

export function useStore(): Store<Estado>{
    return vuexUseStore(key)
}