import styles from "@styles/citas.module.scss";

export const ClosedTimeBTN = ({ time, stateStyles, callback }: appointmentsButtons) => (
	<button
		onClick={() => callback && callback()}
		className={`${styles["appointment-btn"]} ${styles.close}`}
	>
		<span className={styles.time}>{time}</span>
		<span className={styles.line}></span>
		<span className={stateStyles}>PUERTAS CERRADAS</span>
	</button>
);
