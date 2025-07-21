async function carregarLocais() {
  const resposta = await fetch('/api/locais');
  const locais = await resposta.json();
  const lista = document.getElementById('lista-locais');
  lista.innerHTML = '';

  locais.forEach(local => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <h3 class="nome">${local.nome}</h3>
      <p><strong>Endereço:</strong> ${local.endereco}</p>
      <p data-tipo="${local.tipo.toLowerCase()}"><strong>Tipo:</strong> ${local.tipo}</p>
      <p class="cidade"><strong>Cidade:</strong> ${local.cidade}</p>
    `;

    lista.appendChild(card);
  });
}

function filtrarTermo() {
  const termo = document.getElementById('buscaTermo').value.toLowerCase();
  const filtroTipo = document.getElementById('filtroTipo').value.toLowerCase();
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    const nome = card.querySelector('.nome').innerText.toLowerCase();
    const cidade = card.querySelector('.cidade').innerText.toLowerCase();
    const tipo = card.querySelector('p[data-tipo]').getAttribute('data-tipo');

    const termoValido = nome.includes(termo) || cidade.includes(termo);
    const tipoValido = filtroTipo === '' || tipo === filtroTipo;

    if (termoValido && tipoValido) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

if (document.getElementById('buscaTermo')) {
  carregarLocais().then(() => {
    filtrarTermo();
    document.getElementById('buscaTermo').addEventListener('input', filtrarTermo);
    document.getElementById('filtroTipo').addEventListener('change', filtrarTermo);
  });
}
