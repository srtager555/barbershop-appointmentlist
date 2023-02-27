import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { VALITD_TIME_LISTENER } from "src/utils/expiredAppointmentChecker";

import Swal from "sweetalert2";
import styles from "@styles/citas.module.scss";

export const UserTimeBTN = ({ time, stateStyles, callback, date }: appointmentsButtons) => {
	const { data: session } = useSession();
	const [availableTime, setAvailableTime] = useState(false);

	const handlerDropAppointment = async () => {
		Swal.fire({
			title: "¿Estas seguro?",
			text: "Borraras tu reserva y alguien más puede tomar el puesto libre",
			confirmButtonText: "Borrar",
			confirmButtonColor: "#f80000",
			showCancelButton: true,
			cancelButtonText: "Cancelar",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const RES = await fetch("/api/appointments/dropAppointment", {
					method: "POST",
					body: JSON.stringify({ user_id: session?.user.id }),
				});

				if (!RES.ok) {
					Swal.fire("¡Algo salió mal!", "Tu petición no se pudo procesar", "error");
				}

				if (callback) callback();
			}
		});
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
			onClick={handlerDropAppointment}
			className={`${styles["appointment-btn"]} ${styles.user}`}
			disabled={availableTime}
		>
			<span className={styles.time}>{time}</span>
			<span className={styles.line}></span>
			<span className={stateStyles}>cancelar reserva</span>
		</button>
	);
};
