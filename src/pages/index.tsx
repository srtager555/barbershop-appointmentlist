import Link from "next/link";
import { useSession } from "next-auth/react";
import type { NextPage } from "next";

import styles from "@styles/Home.module.scss";

const Home: NextPage = () => {
	const { data: session } = useSession();

	return (
		<div className={styles.container}>
			<div className={styles["container-content"]}>
				<h1 className={styles.title}>Barberia Jossiel</h1>
				<Link href={session ? "/citas" : "/login"} className={styles["circle-link"]}>
					<span>Entrar</span>
				</Link>
			</div>
			<div className={styles["social-networks"]}>
				<a href="" target="_blank">
					instagram
				</a>
				<a href="" target="_blank">
					facebook
				</a>
			</div>
		</div>
	);
};

export default Home;
