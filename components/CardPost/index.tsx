import Image from 'next/image';
import styles from './cardpost.module.css';
import Avatar from '../Avatar';
import Link from 'next/link';

interface cardPostProps {
	post: any;
	highlight: any;
}

export const CardPost = ({ post, highlight }: cardPostProps) => {
	return (
		<Link
			href={`/post/${post.slug}`}
			className={styles.link}>
			<article className={styles.card} style={{width: highlight ? '993' : '133'}}>
				<header className={styles.header}>
					<figure style={{height: highlight ? '300' : '133'}}>
						<Image
							src={post.cover}
							width={438}
							height={133}
							alt={`Capa do post de titulo: ${post.title}`}
						/>
					</figure>
				</header>
				<section className={styles.body}>
					<h2>{post.title}</h2>
					<p>{post.body}</p>
				</section>
				<footer className={styles.footer}>
					<Avatar
						src={post.autor.avatar}
						name={post.autor.username}
					/>
				</footer>
			</article>
		</Link>
	);
};
