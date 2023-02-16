import styles from "@styles/citas.module.scss";

export const UserTimeBTN = ({ index, time, stateStyles, callback }: appointmentsButtons) => (
	<button
		key={`${index} - ${time}`}
		onClick={() => callback}
		className={`${styles["appointment-btn"]} ${styles.user}`}
	>
		<span className={styles.time}>{time}</span>
		<span className={styles.line}></span>
		<span className={stateStyles}>cancelar reserva</span>
	</button>
);
 