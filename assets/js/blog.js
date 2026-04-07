function formatarData(dataISO) {
  const data = new Date(`${dataISO}T12:00:00`);

  return data.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function criarCardPost(post) {
  const article = document.createElement('article');
  article.className = 'post-card';

  article.innerHTML = `
    <a class="post-card-link" href="${post.link}">
      <img class="post-card-image" src="${post.imagem}" alt="${post.alt || post.titulo}">
      <div class="post-card-content">
        <p class="post-card-date">${formatarData(post.data)}</p>
        <h2 class="post-card-title">${post.titulo}</h2>
        <p class="post-card-summary">${post.resumo}</p>
        <span class="post-card-readmore">Ler postagem</span>
      </div>
    </a>
  `;

  return article;
}

async function carregarPosts() {
  const container = document.getElementById('posts-list');

  try {
    const response = await fetch('/data/posts.json');

    if (!response.ok) {
      throw new Error('Não foi possível carregar os posts.');
    }

    const posts = await response.json();

    posts.sort((a, b) => new Date(b.data) - new Date(a.data));

    container.innerHTML = '';

    if (!posts.length) {
      container.innerHTML = '<p>Nenhuma postagem encontrada.</p>';
      return;
    }

    posts.forEach(post => {
      container.appendChild(criarCardPost(post));
    });
  } catch (erro) {
    console.error(erro);
    container.innerHTML = '<p>Erro ao carregar as postagens.</p>';
  }
}

carregarPosts();