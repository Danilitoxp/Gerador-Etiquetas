const form = document.getElementById('etiquetaForm');
const descricaoInput = document.getElementById('descricao');
const fotoInput = document.getElementById('foto');
const fornecedorSelect = document.getElementById('fornecedor');
const descricaoPreview = document.getElementById('descricaoPreview');
const fotoPreview = document.getElementById('fotoPreview');
const fornecedorPreview = document.getElementById('fornecedorPreview');
const etiquetasContainer = document.querySelector('.etiquetas');

let etiquetas = []; // Array para armazenar as etiquetas individuais
let etiquetaAtual = 1; // Controla a etiqueta atual a ser adicionada na folha
let ultimaImagemSrc = ''; // Armazena o caminho da última imagem do produto
let ultimaLogoSrc = ''; // Armazena o caminho da última imagem do fornecedor

document.getElementById('AdicionarEtiqueta').addEventListener('click', function() {
    // Clonar o preview da etiqueta
    const novaEtiqueta = document.getElementById('etiquetaPreview').cloneNode(true);
    novaEtiqueta.id = ''; // Remover o ID para evitar IDs duplicados

    // Ajustar a altura da nova etiqueta
    novaEtiqueta.style.height = '100%';
    novaEtiqueta.style.border = '5px solid #006eff';
    novaEtiqueta.style.padding = '0px';

    // Ajustar a largura da imagem do produto conforme o design
    const novaImagemProduto = novaEtiqueta.querySelector('#fotoPreview');
    novaImagemProduto.style.width = '30%';
    novaImagemProduto.style.height = '100%';
    novaImagemProduto.style.padding = '7px';
    novaImagemProduto.style.position = 'relative';
    novaImagemProduto.style.left = '-1px';
    novaImagemProduto.style.border = '4px solid black';
    novaImagemProduto.style.margin = '5px';
    novaImagemProduto.style.top = '-8px';

    // Aplicar o estilo definido no CSS para o fornecedorPreview
    const novaImagemFornecedor = novaEtiqueta.querySelector('#fornecedorPreview');
    if (novaImagemFornecedor) {
        novaImagemFornecedor.style.width = '85px'; // Garantir que o tamanho esteja correto
        novaImagemFornecedor.style.height = '17px'; // Garantir que a altura esteja correta
        novaImagemFornecedor.style.padding = '0';
        novaImagemFornecedor.style.position = 'absolute';
        novaImagemFornecedor.style.left = '18px';
        novaImagemFornecedor.style.top = '-10px';
        novaImagemFornecedor.style.border = 'none';
        novaImagemFornecedor.style.backgroundColor = 'white';
    }

    // Ajustar o texto da descrição conforme o design
    const novaDescricao = novaEtiqueta.querySelector('#descricaoPreview');
    novaDescricao.style.width = '100%';
    novaDescricao.style.fontSize = '0.6rem';
    novaDescricao.style.margin = '2px';
    novaDescricao.style.padding = '0';
    novaDescricao.style.fontWeight = '800';

    // Atualizar a descrição da nova etiqueta
    novaDescricao.textContent = descricaoInput.value;

    // Usar a última imagem do produto ou a nova imagem selecionada
    novaImagemProduto.src = ultimaImagemSrc || fotoPreview.src;
    novaImagemProduto.alt = 'Foto do Produto';

    // Usar a última imagem do fornecedor ou esconder se não houver seleção
    novaImagemFornecedor.src = ultimaLogoSrc;
    novaImagemFornecedor.style.display = ultimaLogoSrc ? 'block' : 'none';

    // Adicionar nova etiqueta ao array de etiquetas
    etiquetas.push(novaEtiqueta);

    // Adicionar nova etiqueta à folha de etiquetas
    const etiquetaContainer = etiquetasContainer.querySelector(`.etiqueta${etiquetaAtual}`);
    etiquetaContainer.innerHTML = ''; // Limpar conteúdo anterior se houver
    etiquetaContainer.appendChild(novaEtiqueta);

    // Atualizar para a próxima etiqueta
    etiquetaAtual++;
});

document.getElementById('baixarEtiqueta').addEventListener('click', function() {
    const tempContainer = document.createElement('div');
    tempContainer.style.display = 'flex';
    tempContainer.style.flexWrap = 'wrap';
    tempContainer.style.width = '210mm'; 
    tempContainer.style.height = '297mm';
    tempContainer.style.padding = '3mm';
    tempContainer.style.boxSizing = 'border-box';

    etiquetas.forEach(etiqueta => {
        const etiquetaClone = etiqueta.cloneNode(true);
        etiquetaClone.style.width = '100mm';
        etiquetaClone.style.height = '50mm';
        etiquetaClone.style.margin = '1mm';
        etiquetaClone.style.transform = 'scale(1)';
        etiquetaClone.style.transformOrigin = 'top left';

        // Aplicar estilo definido no CSS
        const descricaoClone = etiquetaClone.querySelector('#descricaoPreview');
        descricaoClone.style.fontSize = '1rem';

        tempContainer.appendChild(etiquetaClone);
    });

    // Garantir que o contêiner tempContainer não ultrapasse o tamanho da página A4
    tempContainer.style.overflow = 'hidden';

    document.body.appendChild(tempContainer);

    html2pdf(tempContainer, {
        margin: 0,
        filename: 'etiquetas.pdf',
        image: { type: 'jpeg', quality: 1 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        html2canvas: { scale: 2 }
    }).then(() => {
        document.body.removeChild(tempContainer);
    });
});


descricaoInput.addEventListener('input', function() {
    descricaoPreview.textContent = this.value;
});

fotoInput.addEventListener('change', function(event) {
    const reader = new FileReader();
    reader.onload = function() {
        fotoPreview.src = reader.result;
        ultimaImagemSrc = reader.result; // Armazena a última imagem do produto
    };
    if (fotoInput.files[0]) {
        reader.readAsDataURL(fotoInput.files[0]);
    }
});

fornecedorSelect.addEventListener('change', function() {
    const fornecedor = fornecedorSelect.value;
    let logoSrc = '';

    switch (fornecedor) {
        case 'Amanco':
            logoSrc = './Amanco.png'; // Caminho da imagem para o fornecedor Amanco
            break;
        case 'Fortlev':
            logoSrc = './Fortlev.png'; // Caminho da imagem para o fornecedor Fortlev
            break;
            case 'Tramontina':
            logoSrc = './Tramontina.png'; // Caminho da imagem para o fornecedor Fortlev
            break;
            case 'Topfusion':
            logoSrc = './Topfusion.png'; // Caminho da imagem para o fornecedor Fortlev
            break;
        default:
            logoSrc = '';
    }

    fornecedorPreview.src = logoSrc;
    fornecedorPreview.style.display = logoSrc ? 'block' : 'none';
    ultimaLogoSrc = logoSrc; // Armazena a última imagem do fornecedor
});
