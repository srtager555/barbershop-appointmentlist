import styles from "@styles/citas.module.scss";

export const ClosedTimeBTN = ({ index, time, stateStyles, callback }: appointmentsButtons) => (
	<button
		key={`${index} - ${time}`}
		onClick={() => callback()}
		className={`${styles["appointment-btn"]} ${styles.close}`}
	>
		<span className={styles.time}>{time}</span>
		<span className={styles.line}></span>
		<span className={stateStyles}>PUERTAS CERRADAS</span>
	</button>
);
