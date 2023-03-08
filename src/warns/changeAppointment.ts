import Swal from "sweetalert2";
import { Session } from "next-auth/core/types";

interface Warn {
	fetcher: Function;
	time: time;
	date: string;
	session: Session;
	callback?: Function | undefined;
}

export const ChangeAppointment = ({ callback, fetcher, time, date, session }: Warn) => {
	Swal.fire({
		icon: "warning",
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
};
