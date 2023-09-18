import IProjeto from "./Iprojeto";

export default interface ITarefa {
    duracaoEmSegundos: number,
    descricao: string,
    projeto: IProjeto,
    id: number
}