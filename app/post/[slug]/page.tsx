import { CardPost } from '@/components/CardPost';
import logger from '@/logger';
import { remark } from 'remark';
import html from 'remark-html';
import styles from './page.module.css';

async function getPostbySlug(slug: string) {
	const url = `http://localhost:3333/posts?slug=${slug}`;

	
	const response = await fetch(url);

	if (!response.ok) {
		logger.error(`Ocorreu um erro ao buscar o post: ${slug}`);
		return {};
	}

	logger.info(`Post buscado com sucesso: ${slug}`);

	const data = await response.json();
	if (data.length === 0) {
		return {};
	}

	const post = data[0];

	const content = await remark().use(html).process(post.markdown);
	post.markdown = content.toString();

	return post;
}
export default async function Posts({ params }) {
	const post = await getPostbySlug(params.slug);
	return (
		<div>
			<CardPost
				post={post}
				highlight
			/>
			<h3 className={styles.subtitle}>Código:</h3>
			<div className={styles.code}>
				<div dangerouslySetInnerHTML={{ __html: post.markdown }} />
			</div>
		</div>
	);
}
