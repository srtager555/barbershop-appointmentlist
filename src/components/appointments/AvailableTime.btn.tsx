import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import styles from "@styles/citas.module.scss";

export const AvailableTimeBTN = ({ time, stateStyles }: appointmentsButtons) => {
	const router = useRouter()
	const { data: session, status } = useSession()

	const handlerUseAppointment = async () => {
		if (status === "unauthenticated") return router.push('/login')

		console.log(session)

		await fetch("/api/appointments/makeAppointment").then((data) => console.log(data.json()))
	}

	return (
		<button onClick={handlerUseAppointment} className={styles["appointment-btn"]}>
			<span className={styles.time}>{time}</span>
			<span className={styles.line}></span>
			<span className={stateStyles}>reservar puesto</span>
		</button>
	);
};
