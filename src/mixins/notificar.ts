import { TipoNotificacao } from "@/interfaces/Inotificacoes"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/mutations"

export const notificacaoMixin = {
    methods: {
        notificar(tipo: TipoNotificacao, titulo: string, texto: string){
            store.commit(NOTIFICAR, {
                titulo,
                texto,
                tipo
            })
        }
    },
}