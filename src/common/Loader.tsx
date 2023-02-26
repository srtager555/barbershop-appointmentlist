import styles from "@styles/Loader.module.scss";

export const Loader = () => (
	<div className={styles.container}>
		<span className={styles["circle"]}></span>
		<span className={`${styles["circle"]} ${styles["delay"]}`}></span>
	</div>
);
