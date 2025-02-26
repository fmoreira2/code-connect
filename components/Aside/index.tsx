import Image from 'next/image';
import styles from './aside.module.css';
import logo from './logo.png'
export default function Aside() {
	return (
		<aside className={styles.aside}>
			<Image src={logo} alt="Logo code connect"  />
		</aside>
	);
}
