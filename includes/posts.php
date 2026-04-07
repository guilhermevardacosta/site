<?php

function carregarPosts(): array
{
    $postsPath = $_SERVER['DOCUMENT_ROOT'] . '/data/posts.json';

    if (!file_exists($postsPath)) {
        return [];
    }

    $json = file_get_contents($postsPath);
    $posts = json_decode($json, true);

    if (!is_array($posts)) {
        return [];
    }

    usort($posts, static function (array $a, array $b): int {
        return strcmp((string) ($b['data'] ?? ''), (string) ($a['data'] ?? ''));
    });

    return $posts;
}

function formatarDataBR(string $data): string
{
    $partes = explode('-', $data);

    if (count($partes) !== 3) {
        return $data;
    }

    [$ano, $mes, $dia] = $partes;

    $meses = [
        '01' => 'janeiro',
        '02' => 'fevereiro',
        '03' => 'março',
        '04' => 'abril',
        '05' => 'maio',
        '06' => 'junho',
        '07' => 'julho',
        '08' => 'agosto',
        '09' => 'setembro',
        '10' => 'outubro',
        '11' => 'novembro',
        '12' => 'dezembro',
    ];

    return (int) $dia . ' de ' . ($meses[$mes] ?? $mes) . ' de ' . $ano;
}

function escapar(?string $valor): string
{
    return htmlspecialchars((string) $valor, ENT_QUOTES, 'UTF-8');
}

function renderizarCardPost(array $post, string $tagTitulo = 'h2'): string
{
    $tagTitulo = in_array($tagTitulo, ['h2', 'h3'], true) ? $tagTitulo : 'h2';

    $titulo = escapar($post['titulo'] ?? 'Sem título');
    $data = formatarDataBR((string) ($post['data'] ?? ''));
    $resumo = escapar($post['resumo'] ?? '');
    $imagem = escapar($post['imagem'] ?? '');
    $link = escapar($post['link'] ?? '#');
    $alt = escapar($post['alt'] ?? ($post['titulo'] ?? 'Imagem do post'));

    return <<<HTML
<article class="post-card">
    <a class="post-card-link" href="{$link}">
        <img class="post-card-image" src="{$imagem}" alt="{$alt}">
        <div class="post-card-content">
            <p class="post-card-date">{$data}</p>
            <{$tagTitulo} class="post-card-title">{$titulo}</{$tagTitulo}>
            <p class="post-card-summary">{$resumo}</p>
            <span class="post-card-readmore">Ler postagem</span>
        </div>
    </a>
</article>
HTML;
}