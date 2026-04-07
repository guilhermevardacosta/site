<?php
$caminhoAtual = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');

function linkAtivo(string $rota, string $caminhoAtual): string
{
    $rota = trim($rota, '/');

    if ($rota === '' && $caminhoAtual === '') {
        return 'is-active';
    }

    if ($rota !== '' && ($caminhoAtual === $rota || str_starts_with($caminhoAtual, $rota . '/'))) {
        return 'is-active';
    }

    return '';
}
?>

<header class="site-header">
    <div class="site-header-inner">
        <div class="site-brand">
            <p class="site-kicker">Literatura e fantasia</p>
            <h1 class="site-title">
                <a href="/">Guilherme Vardacosta</a>
            </h1>
            <p class="site-subtitle">
                Um espaço para leituras, reflexões e textos sobre fantasia, tradição literária e mundos imaginários.
            </p>
        </div>

        <nav class="site-nav" aria-label="Navegação principal">
            <a class="<?php echo linkAtivo('', $caminhoAtual); ?>" href="/">Início</a>
            <a class="<?php echo linkAtivo('blog', $caminhoAtual); ?>" href="/blog/">Blog</a>
            <a class="<?php echo linkAtivo('sobre', $caminhoAtual); ?>" href="/sobre">Sobre</a>
            <a class="<?php echo linkAtivo('contato', $caminhoAtual); ?>" href="/contato">Contato</a>
        </nav>
    </div>
</header>