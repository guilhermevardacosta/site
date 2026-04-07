<?php
$pageTitle = 'Meu primeiro post';
$pageDescription = 'Primeiro texto do blog, com uma breve apresentação da proposta do site e dos temas que serão abordados.';
$pageCanonical = 'https://guilhermevardacosta.com.br/blog/01-meu-primeiro-post';

require_once $_SERVER['DOCUMENT_ROOT'] . '/includes/head.php';
?>

<?php include $_SERVER['DOCUMENT_ROOT'] . '/components/header.php'; ?>

		<main>

    		<article class="post-single">

      			<p class="post-single-date">7 de abril de 2026</p>
      			
				<h1>Meu primeiro post</h1>

      			<img class="post-single-image" src="/assets/img/1.jpg" alt="Imagem de capa do primeiro post">

      			<p>Este é um exemplo de postagem individual. Aqui entra o texto completo do artigo, com quantos parágrafos você quiser.</p>
      			<p>Você pode usar essa estrutura para publicar textos sobre livros, fantasia, escrita, leituras em andamento e qualquer outro tema do seu site.</p>
      			<p>Cada nova postagem será um arquivo HTML novo, enquanto a página do blog listará automaticamente os links com imagem, data e resumo a partir do arquivo JSON.</p>

    		</article>
			
  		</main>

		<?php include $_SERVER['DOCUMENT_ROOT'] . '/components/footer.php'; ?>

	</body>

</html>