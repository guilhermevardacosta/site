// Lista central de postagens (as mais recentes no topo)
const postagens = [
  {
    titulo: "A Lâmina e a Poeira: O Guia Definitivo para o Universo de Robert E. Howard",
    url: "/blog/guia-definitivo-robert-e-howard",
    dataIso: "2026-09-19",
    dataTexto: "19 de Setembro, 2026",
    categoria: "Guia de Leitura",
    resumo: "A cosmologia cósmica, os 5 grandes ciclos literários e a cronologia exata de 69 obras para ler o criador de Conan e da espada-e-feitiçaria da forma correta.",
    tempoLeitura: "8 min"
  },  
  {
    titulo: "Olá, mundo!",
    url: "/blog/ola-mundo",
    dataIso: "2026-09-13",
    dataTexto: "13 de Setembro, 2026",
    categoria: "Diário de Bordo",
    resumo: "Um canto só meu na internet para falar sobre a obsessão com a literatura de fantasia, o retorno às leituras em 2026 e o plano de tirar histórias da gaveta.",
    tempoLeitura: "2 min"
  }
];

// Monta o template HTML de cada card
function criarCardArtigo(post) {
  return `
    <article class="post-preview-card">
      <div class="post-preview-meta">
        <span class="genre-tag">${post.categoria}</span>
        <time datetime="${post.dataIso}">${post.dataTexto}</time>
      </div>
      <h2 class="post-preview-title">
        <a href="${post.url}">${post.titulo}</a>
      </h2>
      <p class="post-preview-excerpt">${post.resumo}</p>
      <div class="post-preview-footer">
        <span class="read-time">Tempo de leitura: ${post.tempoLeitura}</span>
        <a href="${post.url}" class="read-more-link">Ler artigo &rarr;</a>
      </div>
    </article>
  `;
}

// Renderiza no feed do blog (todos os artigos) ou na Home (apenas os últimos)
function renderizarPosts() {
  const feedBlog = document.getElementById("blog-feed");
  const feedHome = document.getElementById("home-recent-posts");

  // 1. Se estiver na página do Blog (/blog/index.html), exibe todas
  if (feedBlog) {
    feedBlog.innerHTML = postagens.map(criarCardArtigo).join("");
  }

  // 2. Se estiver na Home (index.html), exibe apenas os 2 últimos
  if (feedHome) {
    const ultimosPosts = postagens.slice(0, 2);
    feedHome.innerHTML = ultimosPosts.map(criarCardArtigo).join("");
  }
}

document.addEventListener("DOMContentLoaded", renderizarPosts);