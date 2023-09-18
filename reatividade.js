const projeto = {
    id: 1,
    descricao: 'Alura Tracker 3.0'
}

const proxy = new Proxy(projeto, {
    get(objOriginal, chave) {
        console.log(`Alguém pediu a chave ${chave} do projeto`)
        return objOriginal[chave]
    },
    set(objOriginal, chave, valor){
        console.log(`Alguém alterou a chave ${chave} do projeto para o valor ${valor}`)
        objOriginal[chave] = valor
    }
})

proxy.descricao = 'Reatividade é mega bacana'

console.log(proxy.descricao)