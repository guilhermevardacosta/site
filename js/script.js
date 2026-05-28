document.addEventListener('DOMContentLoaded', () => {
    
    /* ====================================================================
       1. GESTÃO DE TEMA E ACESSIBILIDADE DAS IMAGENS
       ==================================================================== */
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;
    const heroImages = document.querySelectorAll('.hero-image-container img');

    // Função central para atualizar a visibilidade e a semântica das imagens
    function updateImagesVisibility(theme, isHovered = false) {
        heroImages.forEach(img => {
            const isCorrectTheme = img.getAttribute('data-theme') === theme;
            const isFrontImage = img.classList.contains('hero-img-front');
            const isSideImage = img.classList.contains('hero-img-side');

            let shouldBeVisible = false;

            if (isCorrectTheme) {
                if (isHovered && isSideImage) shouldBeVisible = true;
                if (!isHovered && isFrontImage) shouldBeVisible = true;
            }

            if (shouldBeVisible) {
                img.classList.add('active');
                img.setAttribute('aria-hidden', 'false');
            } else {
                img.classList.remove('active');
                img.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // Aplica o tema, salva a preferência e ajusta as imagens
    function applyTheme(theme) {
        const isLight = theme === 'light';
        body.classList.toggle('light-theme', isLight);
        localStorage.setItem('theme', theme);
        
        // Atualiza ícone do botão
        themeIcon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
        
        // Atualiza imagens garantindo que o estado não-hovered seja o padrão
        updateImagesVisibility(theme, false);
    }

    // Inicialização do Tema
    if (themeToggle) {
        // Verifica se há preferência salva, caso contrário, usa o padrão do HTML (light)
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            applyTheme(savedTheme);
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    }

    /* ====================================================================
       2. EFEITO DE OLHAR (HOVER) NAS FOTOS DO HERO
       ==================================================================== */
    const heroImageContainer = document.querySelector('.hero-image-container');
    
    // Verifica se o dispositivo possui um cursor de precisão (mouse)
    // Se for touch (celular), ignoramos a lógica complexa de hover para evitar bugs visuais
    const isHoverSupported = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (heroImageContainer && isHoverSupported) {
        heroImageContainer.addEventListener('mouseenter', () => {
            const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
            updateImagesVisibility(currentTheme, true);
        });

        heroImageContainer.addEventListener('mouseleave', () => {
            const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
            updateImagesVisibility(currentTheme, false);
        });
    }

    /* ====================================================================
       3. FORMULÁRIO DE CONTATO (WHATSAPP BUSINESS)
       ==================================================================== */
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o recarregamento da página

            // DADO CRÍTICO: Substitua pelo seu número real. Formato: 55 + DDD + Número
            // Ex: 5553991079395
            const myPhoneNumber = '5553991079395'; 
            
            const nameInput = document.getElementById('name').value.trim();
            const messageInput = document.getElementById('message').value.trim();

            // Validação de segurança básica
            if (!nameInput || !messageInput) {
                alert('Por favor, preencha os campos para que eu possa entender o seu negócio.');
                return;
            }

            // Construção da mensagem formatada para vendas
            const fullMessage = `Olá, Guilherme! Meu nome é ${nameInput}.\n\nEstou entrando em contato pelo seu site e gostaria de conversar sobre a criação de um site para o meu negócio.\n\nDetalhes que deixei no formulário:\n"${messageInput}"`;
            
            const encodedMessage = encodeURIComponent(fullMessage);
            const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${encodedMessage}`;
            
            // O uso do wa.me é a documentação oficial atualizada do WhatsApp e reduz 
            // a fricção de redirecionamento em dispositivos móveis.
            window.open(whatsappUrl, '_blank');
            
            // Opcional: limpa o formulário após o envio
            contactForm.reset();
        });
    }
});