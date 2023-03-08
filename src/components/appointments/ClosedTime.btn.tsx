import { useSession } from "next-auth/react";

import styles from "@styles/citas.module.scss";
import { handlerCloseAndOpenAnAppointment } from "@utils/closeAndOpenAppoinment";

export const ClosedTimeBTN = ({ time, date, stateStyles }: appointmentsButtons) => {
	const { data: session, status } = useSession();
	const role = status === "authenticated" && session.user.role;

	return (
		<button
			className={`${styles["appointment-btn"]} ${styles.close}`}
			onClick={() => {
				if (status === "authenticated")
					if (session.user.role === "admin") handlerCloseAndOpenAnAppointment(date, time);
			}}
		>
			<span className={styles.time}>{time}</span>
			<span className={styles.line}></span>
			<span className={stateStyles}>
				{role === "admin" ? "Abrir puertas" : "PUERTAS CERRADAS"}
			</span>
		</button>
	);
};
