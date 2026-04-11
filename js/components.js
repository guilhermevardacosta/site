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
  }
}

async function loadComponents() {
  await loadComponent("#site-header", "/components/header.html");
  await loadComponent("#site-footer", "/components/footer.html");
  await loadComponent("#site-cookies", "/components/cookies.html");

  document.dispatchEvent(new CustomEvent("componentsLoaded"));
}

document.addEventListener("DOMContentLoaded", loadComponents);