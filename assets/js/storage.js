function salvarJogos(jogos) {
    localStorage.setItem("jogos", JSON.stringify(jogos));
}

function carregarJogos() {
    const dados = localStorage.getItem("jogos");

    if (dados) {
        return JSON.parse(dados);
    }

    return [];
}