import { CardPost } from '@/components/CardPost';
import logger from '@/logger';
import styles from './page.module.css';
import Link from 'next/link';
import db from '@/prisma/db';

async function getPosts(page, searchTerm) {
	try {

		const where = {
			
		}

		if (searchTerm) {
			where.title = {
				contains: searchTerm,
				mode: 'insensitive',
			}
		}

		const take = 6;
		const skip = (page - 1) * take;

		const prev = page > 1 ? page - 1 : null;
		const totalItems = await db.post.count({where});
		const totalPages = Math.ceil(totalItems / take);
		const next = page < totalPages ? page + 1 : null;
		const posts = (await db.post.findMany({
			take: take,
			skip: skip,
			where: where,
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				autor: true,
			}
		}))

		return { data: posts, prev: prev, next: next };
	} catch (error) {
		logger.error(`Ocorreu um erro ao buscar os posts: ${error}`);
		return { data: [], prev: null, next: null };
	}
}

export default async function Home({ searchParams }) {
	const currentPage = parseInt(searchParams?.page || 1);
	const searchTerm = searchParams?.q;
	const { data: posts, prev, next } = await getPosts(currentPage, searchTerm);
	return (
		<main className={styles.grid}>
			{posts.map((post) => (
				<CardPost
					key={post.id}
					post={post}
				/>
			))}
			<div className={styles.links}>
				{prev && (
					<Link
						href={{
							pathname: '/',
							query: { page: prev, q: searchTerm },
						}}
						className={styles.button}>
						Página Anterior
					</Link>
				)}
				{next && (
					<Link
						href={{
							pathname: '/',
							query: { page: next, q: searchTerm },
						}}
						className={styles.button}>
						Próxima Página
					</Link>
				)}
			</div>
		</main>
	);
}
