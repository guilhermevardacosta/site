function carregarComponente(id, arquivo) {
  fetch(arquivo)
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      document.getElementById(id).innerHTML = data;
    })
    .catch(function (erro) {
      console.error('Erro ao carregar componente:', erro);
    });
}

carregarComponente('header', '/components/header.html');
carregarComponente('footer', '/components/footer.html');