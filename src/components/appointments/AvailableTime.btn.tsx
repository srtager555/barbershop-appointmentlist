import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { VALITD_TIME_LISTENER } from "src/utils/expiredAppointmentChecker";

import { ChangeAppointment } from "@warns/changeAppointment";
import { handlerCloseAndOpenAnAppointment } from "@utils/closeAndOpenAppoinment";

import styles from "@styles/citas.module.scss";

const fetcher = async (body: AppointAPIBody) =>
	await fetch("/api/appointments/makeAppointment", {
		method: "POST",
		body: JSON.stringify(body),
	});

export const AvailableTimeBTN = ({ time, stateStyles, date, callback }: appointmentsButtons) => {
	const [availableTime, setAvailableTime] = useState(false);
	const router = useRouter();
	const { data: session, status } = useSession();

	const handlerUserAppointment = async () => {
		if (status === "unauthenticated" || !session) return router.push("/login");

		const RESPONSE = await fetcher({
			time,
			date,
			user_id: session.user.id,
		});

		const { hasAppointment }: AppointAPIResponse = await RESPONSE.json();

		if (hasAppointment) ChangeAppointment({ callback, fetcher, time, date, session });
	};

	useEffect(() => {
		const LISTENER = VALITD_TIME_LISTENER({ time, date, availableTime, setAvailableTime });

		return () => {
			clearInterval(LISTENER);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (status === "authenticated" && session.user.role) === "admin" ? (
		<button
			onClick={() => handlerCloseAndOpenAnAppointment(date, time)}
			className={`${styles["appointment-btn"]}`}
			disabled={availableTime}
		>
			<span className={styles.time}>{time}</span>
			<span className={styles.line}></span>
			<span className={stateStyles}>Cerrar reserva</span>
		</button>
	) : (
		<button
			onClick={handlerUserAppointment}
			className={`${styles["appointment-btn"]}`}
			disabled={availableTime}
		>
			<span className={styles.time}>{time}</span>
			<span className={styles.line}></span>
			<span className={stateStyles}>reservar puesto</span>
		</button>
	);
};
