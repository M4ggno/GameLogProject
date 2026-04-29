const RAWG_API_KEY = "701acf27959046158a57a35c41e8a9c5";

async function buscarJogos(nome) {
    const url =
        "https://api.rawg.io/api/games?key=" +
        RAWG_API_KEY +
        "&search=" +
        nome;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        if (dados.results) {
            return dados.results;
        }

        return [];
    } catch (erro) {
        console.error("Erro ao buscar jogos:", erro);
        return [];
    }
}

function converterJogo(apiJogo) {
    return {
        nome: apiJogo.name,
        plataforma: "API",
        zerado: false,
        imagem: apiJogo.background_image
    };
}