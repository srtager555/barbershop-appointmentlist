import { useEffect, useState } from "react";
import { VALITD_TIME_LISTENER } from "src/utils/expiredAppointmentChecker";
import { useSession } from "next-auth/react";
import { Session } from "next-auth/core/types";

import styles from "@styles/citas.module.scss";
import indexStyles from "@styles/index.module.scss";
import { AdminDropAppointmentWarn } from "src/warns/dropAppointment.admin";

interface btnProps {
	callback?: Function;
	availableTime: boolean;
	stateStyles: string;
	time: string;
}

interface adminProps extends btnProps {
	session: Session;
	user_id: number | null;
}

interface BusyAppointmentProps extends appointmentsButtons {
	user_id: number;
}

export const BusyTimeBTN = (props: BusyAppointmentProps) => {
	const [availableTime, setAvailableTime] = useState(false);
	const { data: session, status } = useSession();
	const { time, date } = props;

	useEffect(() => {
		const LISTENER = VALITD_TIME_LISTENER({ time, date, availableTime, setAvailableTime });

		return () => {
			clearInterval(LISTENER);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (status === "authenticated") {
		if (session.user.role === "admin")
			return <AdminBtn session={session} availableTime={availableTime} {...props} />;

		return <UserBtn availableTime={availableTime} {...props} />;
	}

	return <UserBtn availableTime={availableTime} {...props} />;
};

const AdminBtn = ({ time, stateStyles, session, user_id }: adminProps) => {
	const [showData, setShowData] = useState(false);

	const handleShow = () => {
		setShowData(!showData);
	};

	const handleDropAppointment = async () => {
		const isConfirmed = AdminDropAppointmentWarn();

		if (!isConfirmed) return;

		fetch("/api/appointments/dropAppointment", {
			method: "POST",
			body: JSON.stringify({
				user_id,
			}),
		});
	};

	return (
		<div
			className={`${styles["appointment-btn"]} ${styles["reserved-appointment"]} ${styles.admin}`}
		>
			<div className={styles["appointment-info"]} onClick={handleShow}>
				<span className={styles.time}>{time}</span>
				<span className={styles.line}></span>
				<span className={stateStyles}>
					{!showData ? "ver más información" : "ocultar información"}
				</span>
			</div>
			<div
				className={`${styles["appointment-info--extended"]} ${showData ? styles.show : ""}`}
			>
				<div className={styles.imageContainer}></div>
				<div className={styles["container--data"]}>
					<p className={styles["user--name"]}>{session.user.name}</p>
					<a href={`tel://${session.user.phone}`} className={styles["user--phone"]}>
						{session.user.phone}
					</a>
					<button
						className={`${indexStyles["btn-action"]} ${indexStyles.warn} ${indexStyles.small}`}
						onClick={handleDropAppointment}
					>
						Cancelar reserva
					</button>
				</div>
			</div>
		</div>
	);
};

const UserBtn = ({ callback, availableTime, stateStyles, time }: btnProps) => (
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
