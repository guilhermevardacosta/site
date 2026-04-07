<?php
$postsPath = $_SERVER['DOCUMENT_ROOT'] . '/data/posts.json';
$posts = [];

if (file_exists($postsPath)) {
    $json = file_get_contents($postsPath);
    $posts = json_decode($json, true) ?? [];
}

usort($posts, function ($a, $b) {
    return strcmp($b['data'] ?? '', $a['data'] ?? '');
});

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
        '12' => 'dezembro'
    ];

    $mesTexto = $meses[$mes] ?? $mes;

    return (int)$dia . ' de ' . $mesTexto . ' de ' . $ano;
}
?>

<!DOCTYPE html>

<html lang="pt-BR">

	<head>

		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Blog | Guilherme Vardacosta</title>
		<meta name="description" content="Artigos sobre livros de fantasia, literatura e reflexões.">
		<link rel="icon" href="/assets/img/favicon.ico">
		<link rel="stylesheet" href="/assets/css/style.css">

	</head>

	<body>

		<?php include $_SERVER['DOCUMENT_ROOT'] . '/components/header.php'; ?>

		<main>
			
			<h2>Blog</h2>
			<p>Aqui você encontra meus textos sobre livros, fantasia e literatura.</p>

			<section class="posts-grid">

				<?php if (empty($posts)): ?>
					<p>Nenhuma postagem encontrada.</p>
				<?php else: ?>
					<?php foreach ($posts as $post): ?>
						<article class="post-card">
							<a class="post-card-link" href="<?php echo htmlspecialchars($post['link'] ?? '#'); ?>">
								<img
									class="post-card-image"
									src="<?php echo htmlspecialchars($post['imagem'] ?? ''); ?>"
									alt="<?php echo htmlspecialchars($post['alt'] ?? ($post['titulo'] ?? 'Imagem do post')); ?>"
								>

								<div class="post-card-content">
									<p class="post-card-date">
										<?php echo formatarDataBR($post['data'] ?? ''); ?>
									</p>

									<h2 class="post-card-title">
										<?php echo htmlspecialchars($post['titulo'] ?? 'Sem título'); ?>
									</h2>

									<p class="post-card-summary">
										<?php echo htmlspecialchars($post['resumo'] ?? ''); ?>
									</p>

									<span class="post-card-readmore">Ler postagem</span>
								</div>
							</a>
						</article>
					<?php endforeach; ?>
				<?php endif; ?>

        	</section>

		</main>

		<?php include $_SERVER['DOCUMENT_ROOT'] . '/components/footer.php'; ?>

	</body>

</html>