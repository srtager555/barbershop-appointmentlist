import styles from "@styles/citas.module.scss";

export const AvailableTimeBTN = ({ llave, time, stateStyles, callback }: appointmentsButtons) => (
	<button
		key={llave}
		onClick={() => callback}
		className={styles["appointment-btn"]}
	>
		<span className={styles.time}>{time}</span>
		<span className={styles.line}></span>
		<span className={stateStyles}>reservar puesto</span>
	</button>
);
