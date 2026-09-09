// Define o componente do Cabeçalho (Header)
class SiteHeader extends HTMLElement {
  connectedCallback() {
    const path = window.location.pathname;
    const isHome = path === '/' || path.endsWith('/index.html') || path.endsWith('/');
    const isBlog = path.includes('/blog');
    const isSobre = path.includes('sobre');
    const isContato = path.includes('contato');

    this.innerHTML = `
      <header class="site-header">
        <div class="container header-inner">
          <a href="/" class="site-logo">Guilherme Vardacosta</a>
          <nav class="main-nav" aria-label="Navegação principal">
            <a href="/" class="${isHome ? 'nav-active' : ''}">Início</a>
            <a href="/blog/" class="${isBlog ? 'nav-active' : ''}">Blog</a>
            <a href="/sobre.html" class="${isSobre ? 'nav-active' : ''}">Sobre</a>
            <a href="/contato.html" class="${isContato ? 'nav-active' : ''}">Contato</a>
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
    const isPrivacidade = path.includes('privacidade');
    const isTermos = path.includes('termos');

    this.innerHTML = `
      <footer>
        <div class="container footer-content">
          <p>© 2026 Guilherme Vardacosta. Literatura fantástica e escrita criativa.</p>
          <div class="footer-links">
            <a href="/privacidade.html" class="${isPrivacidade ? 'active-legal' : ''}">Política de Privacidade</a>
            <span>•</span>
            <a href="/termos.html" class="${isTermos ? 'active-legal' : ''}">Termos de Uso</a>
          </div>
        </div>
      </footer>
    `;
  }
}

// Registra as novas tags HTML para o navegador reconhecer
customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);