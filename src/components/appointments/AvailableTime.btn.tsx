import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { VALITD_TIME_LISTENER } from "src/utils/expiredAppointmentChecker";

import Swal from "sweetalert2";
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

		if (hasAppointment) {
			Swal.fire({
				icon: "info",
				title: "¡Ya tienes una reserva!",
				text: "Solo puedes tener una reserva a la vez",
				confirmButtonText: "Cambiar reserva",
				cancelButtonText: "Cancelar",
				showCancelButton: true,
			}).then(async (result) => {
				if (result.isConfirmed) {
					try {
						await fetcher({
							time,
							date,
							user_id: session.user.id,
							createNewAppoint: true,
						});

						Swal.fire("Hecho!", "Tu reserva a sido cambiada", "success");
						if (callback) callback();
					} catch (error) {
						Swal.fire("¡Algo fallo!", "Hubo une error al hacer la reserva", "error");
						console.log(error);
					}
				}
			});
		}
	};

	useEffect(() => {
		const LISTENER = VALITD_TIME_LISTENER({ time, date, availableTime, setAvailableTime });

		return () => {
			clearInterval(LISTENER);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
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
