async function loadComponent(selector, filePath) {
  const element = document.querySelector(selector);

  if (!element) return;

  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`Erro ao carregar ${filePath}: ${response.status}`);
    }

    const html = await response.text();
    element.innerHTML = html;
  } catch (error) {
    console.error(error);
    element.innerHTML = `
      <p style="font-size: 1.4rem; padding: 1rem;">
        Não foi possível carregar este componente.
      </p>
    `;
  }
}

async function loadComponents() {
  try {
    await Promise.all([
      loadComponent("#site-header", "/components/header.html"),
      loadComponent("#site-footer", "/components/footer.html"),
      loadComponent("#site-cookies", "/components/cookies.html")
    ]);
  } finally {
    document.dispatchEvent(new CustomEvent("componentsLoaded"));
  }
}

document.addEventListener("DOMContentLoaded", loadComponents);