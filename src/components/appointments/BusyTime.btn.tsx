import { useEffect, useState } from "react";
import { VALITD_TIME_LISTENER } from "src/utils/expiredAppointmentChecker";
import { useSession } from "next-auth/react";

import styles from "@styles/citas.module.scss";

export const BusyTimeBTN = ({ time, stateStyles, callback, date }: appointmentsButtons) => {
	const [availableTime, setAvailableTime] = useState(false);
	const { data: session, status } = useSession();

	useEffect(() => {
		const LISTENER = VALITD_TIME_LISTENER({ time, date, availableTime, setAvailableTime });

		return () => {
			clearInterval(LISTENER);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return status === "authenticated" && session.user.role === "admin" ? (
		<button>
			<div className={styles["appointment-info"]}>
				<span className={styles.time}>{time}</span>
				<span className={styles.line}></span>
				<span className={stateStyles}>reservado</span>
			</div>
			<div className={styles["appointment-info--extended"]}>
				<div className={styles.imageContainer}></div>
				<div className={styles["container--data"]}>
					<p className={styles["user--name"]}>{session.user.name}</p>
					<p className={styles["user--phone"]}>{session.user.phone}</p>
					<button>Cancelar reserva</button>
				</div>
			</div>
		</button>
	) : (
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
