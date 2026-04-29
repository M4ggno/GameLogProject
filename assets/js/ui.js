const listaJogos = document.querySelector("#listaJogos");
const contadorJogos = document.querySelector("#contadorJogos");

function atualizarContador(jogos) {
    contadorJogos.innerText = jogos.length;
}

function criarElementoJogo(jogo, jogos, atualizarCallback) {
    const li = document.createElement("li");

    if (jogo.zerado === true) {
        li.classList.add("zerado");
    }

    const divInfo = document.createElement("div");
    divInfo.classList.add("jogo-info");

    const pNome = document.createElement("p");
    pNome.classList.add("jogo-nome");
    pNome.innerText = jogo.nome;

    const pPlataforma = document.createElement("p");
    pPlataforma.classList.add("jogo-plataforma");
    pPlataforma.innerText = jogo.plataforma;

    divInfo.appendChild(pNome);
    divInfo.appendChild(pPlataforma);

    const divAcoes = document.createElement("div");
    divAcoes.classList.add("acoes");

    const btnZerado = document.createElement("button");
    btnZerado.classList.add("btn-zerado");

    if (jogo.zerado === true) {
        btnZerado.innerText = "Desfazer";
    } else {
        btnZerado.innerText = "Zerado";
    }

    btnZerado.addEventListener("click", function () {
        if (jogo.zerado === true) {
            jogo.zerado = false;
        } else {
            jogo.zerado = true;
        }

        atualizarCallback();
    });

    const btnRemover = document.createElement("button");
    btnRemover.classList.add("btn-remover");
    btnRemover.innerText = "Remover";

    btnRemover.addEventListener("click", function () {
        let novaLista = [];

        for (let i = 0; i < jogos.length; i++) {
            if (jogos[i] !== jogo) {
                novaLista.push(jogos[i]);
            }
        }

        atualizarCallback(novaLista);
    });

    divAcoes.appendChild(btnZerado);
    divAcoes.appendChild(btnRemover);

    li.appendChild(divInfo);
    li.appendChild(divAcoes);

    return li;
}

function renderizarJogos(jogos, atualizarCallback, mostrarApenasZerados) {
    listaJogos.innerHTML = "";

    let jogosParaMostrar = [];

    if (mostrarApenasZerados === true) {
        for (let i = 0; i < jogos.length; i++) {
            if (jogos[i].zerado === true) {
                jogosParaMostrar.push(jogos[i]);
            }
        }
    } else {
        for (let i = 0; i < jogos.length; i++) {
            jogosParaMostrar.push(jogos[i]);
        }
    }

    for (let i = 0; i < jogosParaMostrar.length; i++) {
        const elemento = criarElementoJogo(
            jogosParaMostrar[i],
            jogos,
            atualizarCallback
        );

        listaJogos.appendChild(elemento);
    }

    atualizarContador(jogos);
}