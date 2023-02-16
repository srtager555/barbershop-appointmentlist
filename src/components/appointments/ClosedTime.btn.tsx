import styles from "@styles/citas.module.scss";

export const ClosedTimeBTN = ({ llave, time, stateStyles, callback }: appointmentsButtons) => (
	<button
		key={llave}
		onClick={() => callback()}
		className={`${styles["appointment-btn"]} ${styles.close}`}
	>
		<span className={styles.time}>{time}</span>
		<span className={styles.line}></span>
		<span className={stateStyles}>PUERTAS CERRADAS</span>
	</button>
);
