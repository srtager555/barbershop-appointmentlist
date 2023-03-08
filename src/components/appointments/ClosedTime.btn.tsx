import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import styles from "@styles/citas.module.scss";
import { handlerCloseAndOpenAnAppointment } from "@utils/closeAndOpenAppoinment";
import { VALITD_TIME_LISTENER } from "@utils/expiredAppointmentChecker";

export const ClosedTimeBTN = ({ time, date, stateStyles }: appointmentsButtons) => {
	const [availableTime, setAvailableTime] = useState(false);
	const { data: session, status } = useSession();
	const role = status === "authenticated" && session.user.role;

	useEffect(() => {
		const LISTENER = VALITD_TIME_LISTENER({ time, date, availableTime, setAvailableTime });

		return () => {
			clearInterval(LISTENER);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<button
			className={`${styles["appointment-btn"]} ${styles.close}`}
			onClick={() => {
				if (status === "authenticated")
					if (session.user.role === "admin") handlerCloseAndOpenAnAppointment(date, time);
			}}
			disabled={availableTime}
		>
			<span className={styles.time}>{time}</span>
			<span className={styles.line}></span>
			<span className={stateStyles}>
				{role === "admin" ? "Abrir puertas" : "PUERTAS CERRADAS"}
			</span>
		</button>
	);
};
