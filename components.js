// Gerenciamento de Tema (Claro / Escuro)
function aplicarTema(tema) {
  document.documentElement.setAttribute("data-theme", tema);
  localStorage.setItem("tema-preferido", tema);
  atualizarIconeTema(tema);
}

function alternarTema() {
  const temaAtual = document.documentElement.getAttribute("data-theme") || "dark";
  const novoTema = temaAtual === "dark" ? "light" : "dark";
  aplicarTema(novoTema);
}

function atualizarIconeTema(tema) {
  const botao = document.getElementById("theme-toggle");
  if (!botao) return;
  
  if (tema === "light") {
    botao.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
      <span class="theme-text">Escuro</span>
    `;
    botao.setAttribute("aria-label", "Mudar para modo escuro");
  } else {
    botao.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <span class="theme-text">Claro</span>
    `;
    botao.setAttribute("aria-label", "Mudar para modo claro");
  }
}

// Inicializa tema antes de renderizar
const temaSalvo = localStorage.getItem("tema-preferido") || 
  (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
document.documentElement.setAttribute("data-theme", temaSalvo);

// Componente Header
class SiteHeader extends HTMLElement {
  connectedCallback() {
    const path = window.location.pathname.replace(/\/$/, "");
    const isHome = path === "" || path === "/index.html";
    const isBlog = path.includes("/blog");
    const isSobre = path.includes("sobre");
    const isContato = path.includes("contato");

    this.innerHTML = `
      <header class="site-header">
        <div class="container header-inner">
          <a href="/" class="site-logo">Guilherme Vardacosta</a>
          
          <div class="header-right">
            <nav class="main-nav" aria-label="Navegação principal">
              <a href="/" class="${isHome ? "nav-active" : ""}" ${isHome ? 'aria-current="page"' : ''}>Início</a>
              <a href="/blog/" class="${isBlog ? "nav-active" : ""}" ${isBlog ? 'aria-current="page"' : ''}>Blog</a>
              <a href="/sobre" class="${isSobre ? "nav-active" : ""}" ${isSobre ? 'aria-current="page"' : ''}>Sobre</a>
              <a href="/contato" class="${isContato ? "nav-active" : ""}" ${isContato ? 'aria-current="page"' : ''}>Contato</a>
            </nav>

            <button id="theme-toggle" class="theme-toggle-btn" type="button" onclick="alternarTema()">
            </button>
          </div>
        </div>
      </header>
    `;

    atualizarIconeTema(document.documentElement.getAttribute("data-theme"));
  }
}

// Componente Footer
class SiteFooter extends HTMLElement {
  connectedCallback() {
    const path = window.location.pathname;
    const isPrivacidade = path.includes("privacidade");
    const isTermos = path.includes("termos");

    this.innerHTML = `
      <footer>
        <div class="container footer-content">
          <p>© 2026 Guilherme Vardacosta. Literatura fantástica e ofício narrativo.</p>
          <div class="footer-links">
            <a href="/privacidade" class="${isPrivacidade ? "active-legal" : ""}">Privacidade</a>
            <span>/</span>
            <a href="/termos" class="${isTermos ? "active-legal" : ""}">Termos de Uso</a>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);

// Detecta a rolagem para ativar o efeito translúcido no Header
window.addEventListener("scroll", () => {
  const header = document.querySelector("site-header");
  if (!header) return;

  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}, { passive: true });