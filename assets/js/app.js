const inputJogo = document.querySelector("#inputJogo");
const selectPlataforma = document.querySelector("#selectPlataforma");
const btnAdicionar = document.querySelector("#btnAdicionar");
const mensagem = document.querySelector("#mensagem");
const filtroZerados = document.querySelector("#filtroZerados");
const btnRemoverTodos = document.querySelector("#btnRemoverTodos");
const sugestoes = document.querySelector("#sugestoes");

let jogos = carregarJogos();


function jogoJaExiste(nome) {
    for (let i = 0; i < jogos.length; i++) {
        if (jogos[i].nome.toLowerCase() === nome.toLowerCase()) {
            return true;
        }
    }
    return false;
}


function atualizar(novaLista) {
    if (novaLista) {
        jogos = novaLista;
    }

    salvarJogos(jogos);
    renderizarJogos(jogos, atualizar, filtroZerados.checked);
}


inputJogo.addEventListener("input", async function () {
    const texto = inputJogo.value.trim();

    if (texto.length < 3) {
        sugestoes.innerHTML = "";
        return;
    }

    const resultados = await buscarJogos(texto);
    mostrarSugestoes(resultados);
});

function mostrarSugestoes(lista) {
    sugestoes.innerHTML = "";

    for (let i = 0; i < lista.length; i++) {
        const jogo = lista[i];

        const li = document.createElement("li");
        li.innerText = jogo.name;

        li.addEventListener("click", function () {
            const convertido = converterJogo(jogo);
            adicionarJogoDireto(convertido);
        });

        sugestoes.appendChild(li);
    }
}

function adicionarJogoDireto(jogo) {
    if (jogoJaExiste(jogo.nome) === true) {
        mensagem.innerText = "Esse jogo já está na lista.";
        return;
    }

    jogo.plataforma = selectPlataforma.value;

    jogos.push(jogo);

    mensagem.innerText = "";
    inputJogo.value = "";
    sugestoes.innerHTML = "";

    atualizar();
}


function adicionarJogo() {
    const nome = inputJogo.value.trim();

    if (nome === "") {
        mensagem.innerText = "Digite um nome.";
        return;
    }

    if (jogoJaExiste(nome) === true) {
        mensagem.innerText = "Esse jogo já está na lista.";
        return;
    }

    const novoJogo = {
        nome: nome,
        plataforma: selectPlataforma.value,
        zerado: false
    };



    jogos.push(novoJogo);

    mensagem.innerText = "";
    inputJogo.value = "";

    atualizar();
}


function removerTodos() {
    if (jogos.length === 0) {
        mensagem.innerText = "Não há jogos.";
        return;
    }

    const confirmar = confirm("Remover todos?");

    if (confirmar === true) {
        jogos = [];
        atualizar();
    }
}


btnAdicionar.addEventListener("click", adicionarJogo);

inputJogo.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        adicionarJogo();
    }
});

btnRemoverTodos.addEventListener("click", removerTodos);

filtroZerados.addEventListener("change", function () {
    renderizarJogos(jogos, atualizar, filtroZerados.checked);
});


renderizarJogos(jogos, atualizar, filtroZerados.checked);