import { CardPost } from '@/components/CardPost';
import logger from '@/logger';
import { remark } from 'remark';
import html from 'remark-html';
import styles from './page.module.css';
import db from '@/prisma/db';
import { redirect } from 'next/navigation';

async function getPostbySlug(slug: string) {
	
	try {
		const post = await db.post.findFirst({
			where: {
				slug: slug,
			},
			include: {
				autor: true,
			},
		});

		if (!post) {
			throw new Error(
				`Não foi possivel encontrar o post com o slug: ${slug}`
			);
			
			
		}

		const content = await remark().use(html).process(post.markdown);
		post.markdown = content.toString();

		return post;
		
	} catch (error) {
		logger.error(`Ocorreu um erro ao buscar o post com o slug: ${slug} - erro: ${error}`);
	}
	redirect('/not-found');
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
