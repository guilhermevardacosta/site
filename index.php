<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/includes/posts.php';

$ultimosPosts = array_slice(carregarPosts(), 0, 3);

$pageTitle = 'Guilherme Vardacosta';
$pageDescription = 'Blog sobre livros de fantasia.';
$pageCanonical = 'https://guilhermevardacosta.com.br/';

require_once $_SERVER['DOCUMENT_ROOT'] . '/includes/head.php';
?>

<?php include $_SERVER['DOCUMENT_ROOT'] . '/components/header.php'; ?>

    <main>
        <h2>Bem-vindo</h2>
        <p>Este é o meu site pessoal. Aqui você vai encontrar conteúdos sobre livros de fantasia.</p>

        <section class="home-latest-posts">
    <div class="home-section-heading">
        <h3>Últimos posts</h3>
        <a class="home-section-link" href="/blog/">Ver todas as postagens</a>
    </div>

    <?php if (empty($ultimosPosts)): ?>
        <p>Nenhuma postagem encontrada.</p>
    <?php else: ?>
        <div class="posts-grid">
            <?php foreach ($ultimosPosts as $post): ?>
                <?php echo renderizarCardPost($post, 'h3'); ?>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</section>
    </main>

    <?php include $_SERVER['DOCUMENT_ROOT'] . '/components/footer.php'; ?>

</body>

</html>