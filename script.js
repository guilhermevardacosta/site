const livros = [
  {
    id: "o-nome-do-vento",
    titulo: "The Name of the Wind",
    autor: "Patrick Rothfuss",
    subgenero: "Alta Fantasia",
    capa: "https://covers.openlibrary.org/b/isbn/OL46535585M.jpg?auto=format&fit=crop&q=80&w=600",
    videoUrl: "https://youtube.com",
    blogUrl: "blog/"
  },
  {
    id: "lendas-e-latas",
    titulo: "Legends & Lattes",
    autor: "Travis Baldree",
    subgenero: "Cozy Fantasy",
    capa: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
    videoUrl: "https://youtube.com",
    blogUrl: "blog/"
  },
  {
    id: "a-primeira-lei",
    titulo: "The Blade Itself",
    autor: "Joe Abercrombie",
    subgenero: "Grimdark",
    capa: "https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&q=80&w=600",
    videoUrl: "https://youtube.com",
    blogUrl: "blog/"
  },
  {
    id: "o-caminho-dos-reis",
    titulo: "The Way of Kings",
    autor: "Brandon Sanderson",
    subgenero: "Alta Fantasia Épica",
    capa: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&q=80&w=600",
    videoUrl: "https://youtube.com",
    blogUrl: "blog/"
  }
];

let subgeneroAtivo = "Todos";

function gerarFiltros() {
  const container = document.getElementById("filtros-container");
  if (!container) return;

  const subgenerosUnicos = ["Todos", ...new Set(livros.map((livro) => livro.subgenero))];

  container.innerHTML = "";
  subgenerosUnicos.forEach((subgenero) => {
    const botao = document.createElement("button");
    botao.classList.add("filter-btn");
    if (subgenero === subgeneroAtivo) botao.classList.add("active");
    botao.textContent = subgenero;
    botao.setAttribute("type", "button");

    botao.addEventListener("click", () => {
      subgeneroAtivo = subgenero;
      document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"));
      botao.classList.add("active");
      renderizarLivros();
    });

    container.appendChild(botao);
  });
}

function renderizarLivros() {
  const container = document.getElementById("livros-grid");
  if (!container) return;

  const livrosFiltrados = subgeneroAtivo === "Todos"
    ? livros
    : livros.filter((livro) => livro.subgenero === subgeneroAtivo);

  container.innerHTML = "";

  if (livrosFiltrados.length === 0) {
    container.innerHTML = `<p style="color: var(--text-muted); grid-column: 1 / -1;">Nenhum livro cadastrado nesta categoria ainda.</p>`;
    return;
  }

  livrosFiltrados.forEach((livro) => {
    const card = document.createElement("article");
    card.classList.add("book-card");

    card.innerHTML = `
      <img src="${livro.capa}" alt="Capa da obra ${livro.titulo}" class="book-cover" loading="lazy" width="230" height="345">
      <div class="book-info">
        <span class="genre-tag">${livro.subgenero}</span>
        <h3 class="book-title">${livro.titulo}</h3>
        <p class="book-author">por ${livro.autor}</p>
        <div class="card-actions">
          <a href="${livro.blogUrl}" class="btn-card highlight">Ler Análise</a>
          <a href="${livro.videoUrl}" target="_blank" rel="noopener noreferrer" class="btn-card" aria-label="Ver vídeo de ${livro.titulo} no YouTube (abre em nova aba)">Vídeo ↗</a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  gerarFiltros();
  renderizarLivros();
});