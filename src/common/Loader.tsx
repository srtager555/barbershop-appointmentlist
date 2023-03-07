import styles from "@styles/Loader.module.scss";

interface loader {
	isThereError?: boolean;
}

export const Loader = ({ isThereError }: loader) => (
	<div className={`${styles.container} ${isThereError ? styles.error : ""}`}>
		<span className={styles["circle"]}></span>
		<span className={`${styles["circle"]} ${styles["delay"]}`}></span>
	</div>
);
