let carrinho = [];

const produtos = [

    {
        id: 1,
        nome: "Camiseta Preta",
        preco: 79.90,
        emoji: "👕"
    },

    {
        id: 2,
        nome: "Calça Jeans",
        preco: 149.90,
        emoji: "👖"
    },

    {
        id: 3,
        nome: "Tênis Casual",
        preco: 199.90,
        emoji: "👟"
    },

    {
        id: 4,
        nome: "Jaqueta",
        preco: 249.90,
        emoji: "🧥"
    },

    {
        id: 5,
        nome: "Boné",
        preco: 59.90,
        emoji: "🧢"
    },

    {
        id: 6,
        nome: "Moletom",
        preco: 179.90,
        emoji: "👚"
    }

];


function mostrarProdutos() {

    const lista =
        document.getElementById("listaProdutos");

    lista.innerHTML = "";

    produtos.forEach(produto => {

        lista.innerHTML += `

            <div class="produto">

                <div class="imagem-produto">

                    <div class="emoji-produto">
                        ${produto.emoji}
                    </div>

                </div>

                <div class="info-produto">

                    <h3>
                        ${produto.nome}
                    </h3>

                    <div class="preco">
                        ${formatarPreco(produto.preco)}
                    </div>

                    <button
                        class="adicionar"
                        onclick="adicionar(${produto.id})">

                        Adicionar ao carrinho

                    </button>

                </div>

            </div>

        `;

    });
}


function adicionar(id) {

    const produto =
        produtos.find(p => p.id === id);

    const item =
        carrinho.find(p => p.id === id);

    if (item) {

        item.quantidade++;

    } else {

        carrinho.push({
            ...produto,
            quantidade: 1
        });

    }

    atualizarCarrinho();

    abrirCarrinho();
}


function remover(id) {

    const item =
        carrinho.find(p => p.id === id);

    if (!item) return;

    item.quantidade--;

    if (item.quantidade <= 0) {

        carrinho =
            carrinho.filter(
                p => p.id !== id
            );

    }

    atualizarCarrinho();
}


function atualizarCarrinho() {

    const lista =
        document.getElementById("itensCarrinho");

    const quantidade =
        document.getElementById("quantidadeCarrinho");

    const totalElemento =
        document.getElementById("total");

    lista.innerHTML = "";

    let total = 0;

    let quantidadeTotal = 0;


    if (carrinho.length === 0) {

        lista.innerHTML = `
            <p style="
                text-align:center;
                color:#777;
                padding:30px;
            ">
                Seu carrinho está vazio 🛒
            </p>
        `;

    }


    carrinho.forEach(item => {

        total +=
            item.preco * item.quantidade;

        quantidadeTotal +=
            item.quantidade;


        lista.innerHTML += `

            <div class="item-carrinho">

                <div class="item-emoji">

                    ${item.emoji}

                </div>

                <div class="item-info">

                    <h4>
                        ${item.nome}
                    </h4>

                    <p>
                        ${formatarPreco(item.preco)}
                    </p>

                    <button
                        onclick="remover(${item.id})">
                        −
                    </button>

                    <span>
                        ${item.quantidade}
                    </span>

                    <button
                        onclick="adicionar(${item.id})">
                        +
                    </button>

                </div>

            </div>

        `;

    });


    quantidade.textContent =
        quantidadeTotal;

    totalElemento.textContent =
        formatarPreco(total);
}


function formatarPreco(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );
}


function abrirCarrinho() {

    document
        .getElementById("carrinho")
        .classList.add("aberto");

    document
        .getElementById("fundoCarrinho")
        .classList.add("aberto");
}


function fecharCarrinho() {

    document
        .getElementById("carrinho")
        .classList.remove("aberto");

    document
        .getElementById("fundoCarrinho")
        .classList.remove("aberto");
}


function finalizarCompra() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;
    }


    let mensagem =
        "Olá! Quero fazer um pedido:\n\n";


    carrinho.forEach(item => {

        mensagem +=
            `${item.nome} - ${item.quantidade}x - ${formatarPreco(item.preco)}\n`;

    });


    const total =
        carrinho.reduce(
            (soma, item) =>
                soma +
                item.preco *
                item.quantidade,
            0
        );


    mensagem +=
        `\nTotal: ${formatarPreco(total)}`;


    // SEU WHATSAPP
    const telefone =
        "5541996518494";


    window.open(
        `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`,
        "_blank"
    );
}


mostrarProdutos();

atualizarCarrinho();