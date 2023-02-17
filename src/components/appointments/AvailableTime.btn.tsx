import styles from "@styles/citas.module.scss";

export const AvailableTimeBTN = ({  time, stateStyles, callback }: appointmentsButtons) => (
	<button
		onClick={() => callback && callback()}
		className={styles["appointment-btn"]}
	>
		<span className={styles.time}>{time}</span>
		<span className={styles.line}></span>
		<span className={stateStyles}>reservar puesto</span>
	</button>
);
