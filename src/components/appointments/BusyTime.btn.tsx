import styles from "@styles/citas.module.scss";

export const BusyTimeBTN = ({ index, time, stateStyles, callback }: appointmentsButtons) => (
	<button
		key={`${index} - ${time}`}
		onClick={() => callback()}
		className={`${styles["appointment-btn"]} ${styles["reserved-appointment"]}`}
	>
		<span className={styles.time}>{time}</span>
		<span className={styles.line}></span>
		<span className={stateStyles}>reservado</span>
	</button>
);
