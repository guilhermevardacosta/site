<?php
$siteName = 'Guilherme Vardacosta';

$pageTitle = $pageTitle ?? $siteName;
$pageDescription = $pageDescription ?? 'Blog sobre livros de fantasia.';
$pageCanonical = $pageCanonical ?? null;

$tituloCompleto = $pageTitle === $siteName
    ? $siteName
    : $pageTitle . ' | ' . $siteName;

function escaparHead(?string $valor): string
{
    return htmlspecialchars((string) $valor, ENT_QUOTES, 'UTF-8');
}
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo escaparHead($tituloCompleto); ?></title>
    <meta name="description" content="<?php echo escaparHead($pageDescription); ?>">
    <link rel="icon" href="/assets/img/favicon.ico">
    <link rel="stylesheet" href="/assets/css/style.css">

    <?php if (!empty($pageCanonical)): ?>
        <link rel="canonical" href="<?php echo escaparHead($pageCanonical); ?>">
    <?php endif; ?>
</head>

<body>