const form = document.getElementById('etiquetaForm');
const descricaoInput = document.getElementById('descricao');
const fotoInput = document.getElementById('foto');
const descricaoPreview = document.getElementById('descricaoPreview');
const fotoPreview = document.getElementById('fotoPreview');
const logoFornecedor = document.getElementById('logoFornecedor');
const etiquetaPreview = document.getElementById('etiquetaPreview');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    descricaoPreview.textContent = descricaoInput.value;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        fotoPreview.src = e.target.result;
    };
    if (fotoInput.files[0]) {
        reader.readAsDataURL(fotoInput.files[0]);
    }
});

document.getElementById('baixarEtiqueta').addEventListener('click', function() {
    const element = document.getElementById('etiquetaPreview');
    
    html2pdf(element, {
        margin:       0,
        filename:     'etiqueta.pdf',
        image:        { type: 'jpeg', quality: 1 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
        html2canvas:  { scale: 2, logging: true, dpi: 192, letterRendering: true }
    });
});

function atualizarLogoFornecedor() {
    const fornecedor = document.getElementById('selecionarFornecedor').value;

    if (fornecedor === 'tramontina') {
        logoFornecedor.src = './tramontina.jpg';
    } else if (fornecedor === 'amanco') {
        logoFornecedor.src = "./amanco.jpg";
    } else {
        logoFornecedor.src = '';
    }
}

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

document.getElementById('selecionarFornecedor').addEventListener('change', atualizarLogoFornecedor);
