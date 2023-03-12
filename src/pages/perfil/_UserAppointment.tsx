import { Noto_Sans_Display as m } from "@next/font/google";

import { UserTimeBTN } from "@components/appointments/UserTime.btn";

import stylesCitas from "@styles/citas.module.scss";

const notoI = m({ weight: ["300"], subsets: ["latin"], style: ["italic"] });

interface UserAppointmentProps {
	appointment: {
		data: rawAppointments | null | undefined;
		expire: boolean | undefined;
	};
}

export function UserAppointment({ appointment }: UserAppointmentProps) {
	const stateStylesItalic = `${notoI.className} ${stylesCitas.state}`;

	return (
		<div className={`${stylesCitas["container-appointments"]} ${stylesCitas.profile}`}>
			<div className={`${stylesCitas["appointment-btn__container"]} ${stylesCitas.profile}`}>
				{appointment.data ? (
					<>
						{!appointment.expire ? (
							<p>Esta es tu reserva, ¡será pronto!</p>
						) : (
							<p>¡Ya pasó, se venció tu reserva!</p>
						)}
						<UserTimeBTN
							time={appointment.data.time}
							stateStyles={stateStylesItalic}
							date={appointment.data.date}
							expire={appointment.expire}
						/>
					</>
				) : (
					<p>¡Aun no has hecho una reserva!</p>
				)}
			</div>
		</div>
	);
}
