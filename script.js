const form = document.getElementById('etiquetaForm');
const descricaoInput = document.getElementById('descricao');
const fotoInput = document.getElementById('foto');
const descricaoPreview = document.getElementById('descricaoPreview');
const fotoPreview = document.getElementById('fotoPreview');
const etiquetasContainer = document.querySelector('.etiquetas');

let etiquetas = []; // Array para armazenar as etiquetas individuais
let etiquetaAtual = 1; // Controla a etiqueta atual a ser adicionada na folha

document.getElementById('AdicionarEtiqueta').addEventListener('click', function() {
    // Clonar o preview da etiqueta
    const novaEtiqueta = etiquetaPreview.cloneNode(true);
    novaEtiqueta.id = ''; // Remover o ID para evitar IDs duplicados

    // Ajustar a altura da nova etiqueta
    novaEtiqueta.style.height = '100%'; // Ajuste a altura conforme necessário
    novaEtiqueta.style.border = '5px solid #006eff';
    novaEtiqueta.style.padding = '0px';

    // Ajustar a largura da imagem conforme o design
    const novaImagem = novaEtiqueta.querySelector('#fotoPreview');
    novaImagem.style.width = '30%'; // Largura conforme especificado no design
    novaImagem.style.height = '100%'; // Altura para preencher a etiqueta
    novaImagem.style.padding = '4px';
    novaImagem.style.position = 'relative';
    novaImagem.style.left = '-1px';
    novaImagem.style.border = '4px solid black';
    novaImagem.style.margin = '5px';
    novaImagem.style.top = '-8px';

    // Ajustar o texto da descrição conforme o design
    const novaDescricao = novaEtiqueta.querySelector('#descricaoPreview');
    novaDescricao.style.width = '100%'; // Largura conforme especificado no design
    novaDescricao.style.fontSize = '0.6rem'; // Ajuste de tamanho da fonte para não empurrar a imagem
    novaDescricao.style.margin = '2px'; // Remover margens para ajuste preciso
    novaDescricao.style.padding = '0'; // Remover padding para ajuste preciso
    novaDescricao.style.fontWeight = '800'; // Ajuste de fonte conforme especificação

    // Atualizar a descrição da nova etiqueta
    novaDescricao.textContent = descricaoInput.value;

    // Clonar a imagem para a nova etiqueta
    novaImagem.src = fotoPreview.src;
    novaImagem.alt = 'Foto do Produto';

    // Adicionar nova etiqueta ao array de etiquetas
    etiquetas.push(novaEtiqueta);

    // Adicionar nova etiqueta à folha de etiquetas
    const etiquetaContainer = etiquetasContainer.querySelector(`.etiqueta${etiquetaAtual}`);
    etiquetaContainer.innerHTML = ''; // Limpar conteúdo anterior se houver
    etiquetaContainer.appendChild(novaEtiqueta);

    // Atualizar para a próxima etiqueta
    etiquetaAtual++;

    // Limpar o preview da etiqueta após adicionar
    descricaoPreview.textContent = 'Descrição do Produto';
    fotoPreview.src = '';
});

document.getElementById('baixarEtiqueta').addEventListener('click', function() {
    // Criar um container temporário para gerar o PDF
    const tempContainer = document.createElement('div');
    tempContainer.style.display = 'flex';
    tempContainer.style.flexWrap = 'wrap';
    tempContainer.style.width = '210mm'; // Largura de uma folha A4
    tempContainer.style.height = '297mm'; // Altura de uma folha A4
    tempContainer.style.padding = '3mm';
    tempContainer.style.boxSizing = 'border-box'; // Incluir padding no tamanho total

    etiquetas.forEach(etiqueta => {
        // Clonar a etiqueta para o container temporário
        const etiquetaClone = etiqueta.cloneNode(true);
        etiquetaClone.style.width = '100mm'; // Ajustar a largura da etiqueta
        etiquetaClone.style.height = '50mm'; // Ajustar a altura da etiqueta
        etiquetaClone.style.margin = '1mm'; // Ajustar a margem entre as etiquetas
        etiquetaClone.style.transform = 'scale(1)'; // Garantir que a escala seja 1:1
        etiquetaClone.style.transformOrigin = 'top left';

        // Ajustar o texto da descrição para o PDF
        const descricaoClone = etiquetaClone.querySelector('#descricaoPreview');
        descricaoClone.style.fontSize = '1rem'; // Aumentar o tamanho da fonte para o PDF

        tempContainer.appendChild(etiquetaClone);
    });

    // Adicionar o container temporário ao body para ser renderizado pelo html2pdf
    document.body.appendChild(tempContainer);

    // Gerar o PDF
    html2pdf(tempContainer, {
        margin: 0,
        filename: 'etiquetas.pdf',
        image: { type: 'jpeg', quality: 1 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        html2canvas: { scale: 2 }
    }).then(() => {
        // Remover o container temporário após a geração do PDF
        document.body.removeChild(tempContainer);
    });
});

// Event listeners para atualizar o preview ao alterar os campos
descricaoInput.addEventListener('input', function() {
    descricaoPreview.textContent = this.value;
});

fotoInput.addEventListener('change', function(event) {
    const reader = new FileReader();
    reader.onload = function(){
        fotoPreview.src = reader.result;
    }
    if (fotoInput.files[0]) {
        reader.readAsDataURL(fotoInput.files[0]);
    }
});
