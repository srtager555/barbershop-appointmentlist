import { useEffect, useState } from "react";
import { VALITD_TIME_LISTENER } from "src/utils/expiredAppointmentChecker";

import styles from "@styles/citas.module.scss";

export const BusyTimeBTN = ({ time, stateStyles, callback, date }: appointmentsButtons) => {
	const [availableTime, setAvailableTime] = useState(false);

	useEffect(() => {
		const LISTENER = VALITD_TIME_LISTENER({ time, date, availableTime, setAvailableTime });

		return () => {
			clearInterval(LISTENER);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<button
			onClick={() => callback && callback()}
			className={`${styles["appointment-btn"]} ${styles["reserved-appointment"]}`}
			disabled={availableTime}
		>
			<span className={styles.time}>{time}</span>
			<span className={styles.line}></span>
			<span className={stateStyles}>reservado</span>
		</button>
	);
};
