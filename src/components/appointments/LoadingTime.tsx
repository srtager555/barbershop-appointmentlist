import styles from "@styles/citas.module.scss";

export const LoadingTime = ({ stateStyles }: appointmentsButtons) => (
	<div
		className={styles["appointment-btn"]}
	>
		<span className={styles.time}>Cargando</span>
		<span className={styles.line}></span>
		<span className={stateStyles}>Espera...</span>
	</div>
);
