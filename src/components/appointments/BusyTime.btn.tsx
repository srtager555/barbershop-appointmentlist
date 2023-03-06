import { useEffect, useState } from "react";
import { VALITD_TIME_LISTENER } from "src/utils/expiredAppointmentChecker";
import { useSession } from "next-auth/react";
import { Session } from "next-auth/core/types";

import styles from "@styles/citas.module.scss";
import indexStyles from "@styles/index.module.scss";

interface btnProps {
	callback?: Function;
	availableTime: boolean;
	stateStyles: string;
	time: string;
}

interface adminProps extends btnProps {
	session: Session;
}

export const BusyTimeBTN = (props: appointmentsButtons) => {
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
	} else return <UserBtn availableTime={availableTime} {...props} />;
};

const AdminBtn = ({ time, stateStyles, session }: adminProps) => {
	const [showData, setShowData] = useState(false);

	const handleShow = () => {
		setShowData(!showData);
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
