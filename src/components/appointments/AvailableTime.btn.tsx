import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import styles from "@styles/citas.module.scss";

export const AvailableTimeBTN = ({ time, stateStyles, date }: appointmentsButtons) => {
	const router = useRouter()
	const { data: session, status } = useSession()

	const handlerUseAppointment = async () => {
		if (status === "unauthenticated" || !session) return router.push('/login')

		await fetch("/api/appointments/makeAppointment", {
			method: "POST",
			body: JSON.stringify({
				time,
				user_id: session.user.id,
				date
			})
		}).then((data) => console.log(data.json()))
	}

	return (
		<button onClick={handlerUseAppointment} className={styles["appointment-btn"]}>
			<span className={styles.time}>{time}</span>
			<span className={styles.line}></span>
			<span className={stateStyles}>reservar puesto</span>
		</button>
	);
};
