document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const heroImageContainer = document.querySelector('.hero-image-container');

    function updateHeroImageOnThemeChange(theme) {
        if (!heroImageContainer) return;

        // Esconde todas as imagens do hero
        heroImageContainer.querySelectorAll('img').forEach(img => img.classList.remove('active'));

        // Ativa a imagem frontal correspondente ao tema
        const frontImageToShow = heroImageContainer.querySelector(`.hero-img-front[data-theme="${theme}"]`);
        if (frontImageToShow) {
            frontImageToShow.classList.add('active');
        }
    }

    const applyTheme = (theme) => {
        body.classList.toggle('light-theme', theme === 'light');
        localStorage.setItem('theme', theme);
        updateHeroImageOnThemeChange(theme);
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = localStorage.getItem('theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // Verificar preferências salvas ou do sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const initialTheme = savedTheme || (prefersLight ? 'light' : 'dark');
    applyTheme(initialTheme);

    // --- Hero Image Hover Effects ---
    if (heroImageContainer) {
        heroImageContainer.addEventListener('mouseenter', () => {
            const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
            const frontImage = heroImageContainer.querySelector(`.hero-img-front[data-theme="${currentTheme}"]`);
            const sideImage = heroImageContainer.querySelector(`.hero-img-side[data-theme="${currentTheme}"]`);

            if (frontImage) frontImage.classList.remove('active');
            if (sideImage) sideImage.classList.add('active');
        });

        heroImageContainer.addEventListener('mouseleave', () => {
            const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
            const frontImage = heroImageContainer.querySelector(`.hero-img-front[data-theme="${currentTheme}"]`);
            const sideImage = heroImageContainer.querySelector(`.hero-img-side[data-theme="${currentTheme}"]`);

            if (sideImage) sideImage.classList.remove('active');
            if (frontImage) frontImage.classList.add('active');
        });
    }

    // --- Header Scroll Effects ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Section Scroll Animations ---
    const hiddenSections = document.querySelectorAll('.section-hidden');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    hiddenSections.forEach(section => observer.observe(section));

    // --- Contact Form Logic ---
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const submitButton = document.getElementById('submit-button');
        const tabButtons = document.querySelectorAll('.tab-button');

        // Tab switching logic
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const selectedMethod = button.dataset.tab;
                contactForm.dataset.method = selectedMethod;
                submitButton.innerHTML = selectedMethod === 'whatsapp'
                    ? 'Enviar via WhatsApp'
                    : 'Enviar via E-mail';
            });
        });

        // Form submission logic
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            // IMPORTANTE: Substitua pelos seus dados reais
            const myPhoneNumber = '5553991079395'; // <- Coloque seu número real aqui no formato 55DDDnúmero
            const myEmail = 'contato@guivardacosta.com.br'; // <- Seu email real
            
            const name = document.getElementById('name').value.trim();
            const message = document.getElementById('message').value.trim();
            const method = contactForm.dataset.method;

            if (name === '' || message === '') {
                alert('Por favor, preencha seu nome e a mensagem.');
                return;
            }

            if (method === 'whatsapp') {
                const fullMessage = `Olá! Meu nome é ${name}.\n\n${message}`;
                const encodedMessage = encodeURIComponent(fullMessage);
                const whatsappUrl = `https://api.whatsapp.com/send?phone=${myPhoneNumber}&text=${encodedMessage}`;
                window.open(whatsappUrl, '_blank');
            } else if (method === 'email') {
                const subject = `Contato do Portfólio - ${name}`;
                const body = `Nome: ${name}\n\nMensagem:\n${message}`;
                const encodedSubject = encodeURIComponent(subject);
                const encodedBody = encodeURIComponent(body);
                const mailtoUrl = `mailto:${myEmail}?subject=${encodedSubject}&body=${encodedBody}`;
                window.location.href = mailtoUrl;
            }
            
            contactForm.reset();
        });
    }
});