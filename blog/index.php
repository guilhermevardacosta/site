<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/includes/posts.php';

$posts = carregarPosts();

$pageTitle = 'Blog';
$pageDescription = 'Artigos sobre livros de fantasia, literatura e reflexões.';
$pageCanonical = 'https://guilhermevardacosta.com.br/blog/';

require_once $_SERVER['DOCUMENT_ROOT'] . '/includes/head.php';
?>

<?php include $_SERVER['DOCUMENT_ROOT'] . '/components/header.php'; ?>

		<main>
			
			<h2>Blog</h2>
			<p>Aqui você encontra meus textos sobre livros, fantasia e literatura.</p>

			<section class="posts-grid">
    <?php if (empty($posts)): ?>
        <p>Nenhuma postagem encontrada.</p>
    <?php else: ?>
        <?php foreach ($posts as $post): ?>
            <?php echo renderizarCardPost($post, 'h2'); ?>
        <?php endforeach; ?>
    <?php endif; ?>
</section>

		</main>

		<?php include $_SERVER['DOCUMENT_ROOT'] . '/components/footer.php'; ?>

	</body>

</html>