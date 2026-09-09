// Define o componente do Cabeçalho (Header)
class SiteHeader extends HTMLElement {
  connectedCallback() {
    const path = window.location.pathname.replace(/\/$/, ""); // Remove barra final se houver
    const isHome = path === "" || path === "/index.html";
    const isBlog = path.includes("/blog");
    const isSobre = path.includes("sobre");
    const isContato = path.includes("contato");

    this.innerHTML = `
      <header class="site-header">
        <div class="container header-inner">
          <a href="/" class="site-logo">Guilherme Vardacosta</a>
          <nav class="main-nav" aria-label="Navegação principal">
            <a href="/" class="${isHome ? "nav-active" : ""}">Início</a>
            <a href="/blog/" class="${isBlog ? "nav-active" : ""}">Blog</a>
            <a href="/sobre" class="${isSobre ? "nav-active" : ""}">Sobre</a>
            <a href="/contato" class="${isContato ? "nav-active" : ""}">Contato</a>
          </nav>
        </div>
      </header>
    `;
  }
}

// Define o componente do Rodapé (Footer)
class SiteFooter extends HTMLElement {
  connectedCallback() {
    const path = window.location.pathname;
    const isPrivacidade = path.includes("privacidade");
    const isTermos = path.includes("termos");

    this.innerHTML = `
      <footer>
        <div class="container footer-content">
          <p>© 2026 Guilherme Vardacosta. Literatura fantástica e escrita criativa.</p>
          <div class="footer-links">
            <a href="/privacidade" class="${isPrivacidade ? "active-legal" : ""}">Política de Privacidade</a>
            <span>•</span>
            <a href="/termos" class="${isTermos ? "active-legal" : ""}">Termos de Uso</a>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);