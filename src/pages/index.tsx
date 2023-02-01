import { Logo } from "src/common/logo";
import Link from "next/link";
import type { NextPage } from "next";

import styles from "@styles/Home.module.scss";

const Home: NextPage = () => (
	<div className={styles.container}>
		<Logo />
		<h1 className={styles.title}>Barberia Jossiel</h1>
		<Link href="/citas" className={styles["circle-link"]}>
			<span>Entrar</span>
		</Link>
	</div>
);

export default Home;
