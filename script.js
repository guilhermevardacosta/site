// Array central de dados dos livros
const livros = [
  {
    titulo: "O Nome do Vento",
    autor: "Patrick Rothfuss",
    subgenero: "Alta Fantasia",
    capa: "https://covers.openlibrary.org/b/isbn/OL46535585M.jpg?auto=format&fit=crop&q=80&w=600",
    videoUrl: "https://youtube.com"
  },
  {
    titulo: "Lendas & Latas",
    autor: "Travis Baldree",
    subgenero: "Cozy Fantasy",
    capa: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
    videoUrl: "https://youtube.com"
  },
  {
    titulo: "A Primeira Lei",
    autor: "Joe Abercrombie",
    subgenero: "Grimdark",
    capa: "https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&q=80&w=600",
    videoUrl: "https://youtube.com"
  },
  {
    titulo: "O Caminho dos Reis",
    autor: "Brandon Sanderson",
    subgenero: "Alta Fantasia Épica",
    capa: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&q=80&w=600",
    videoUrl: "https://youtube.com"
  }
];

// Função que cria o HTML dos cards e joga na tela
function carregarLivros() {
  const container = document.getElementById("livros-grid");
  container.innerHTML = "";

  livros.forEach((livro) => {
    const card = document.createElement("article");
    card.classList.add("book-card");

    card.innerHTML = `
      <img src="${livro.capa}" alt="Capa do livro ${livro.titulo}" class="book-cover" loading="lazy">
      <div class="book-info">
        <span class="genre-tag">${livro.subgenero}</span>
        <h3 class="book-title">${livro.titulo}</h3>
        <p class="book-author">por ${livro.autor}</p>
        <a href="${livro.videoUrl}" target="_blank" rel="noopener noreferrer" class="btn-card">
          Assistir Resenha ↗
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}

// Executa assim que a página carregar
document.addEventListener("DOMContentLoaded", carregarLivros);