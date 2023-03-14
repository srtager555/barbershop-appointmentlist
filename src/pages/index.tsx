import Link from "next/link";
import type { GetServerSideProps, NextPage } from "next";

import styles from "@styles/Home.module.scss";
import { supabase } from "@ddbb/supabase.client";
import { useEffect } from "react";

export const getServerSideProps: GetServerSideProps = async () => {
	const { data, error } = await supabase.functions.invoke("noti", {
		body: {
			name: "Carlos",
		},
	});
	return {
		props: {
			data,
		},
	};
};

const Home: NextPage = (data) => {
	useEffect(() => {
		console.log(data);
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles["container-content"]}>
				<h1 className={styles.title}>Barberia Jossiel</h1>
				<Link href="/citas" className={styles["circle-link"]}>
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
