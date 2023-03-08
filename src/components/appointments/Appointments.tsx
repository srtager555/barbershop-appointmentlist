import { Noto_Sans_Display as m } from "@next/font/google";

import { useSession } from "next-auth/react";

import { ClosedTimeBTN } from "./ClosedTime.btn";
import { BusyTimeBTN } from "./BusyTime.btn";
import { UserTimeBTN } from "./UserTime.btn";
import { AvailableTimeBTN } from "./AvailableTime.btn";
import { LoadingTime } from "./LoadingTime";
import { TODAY_CUSTOM_EN } from "@common/timeData";

import styles from "@styles/citas.module.scss";

interface AppointmentsProps {
	dataToPrint: appointmentData[];
	opening: { es: string; en: string } | undefined;
	UpgradedAppointList: VoidFunction;
}

const noto = m({ weight: ["400"], subsets: ["latin"] });
const notoI = m({ weight: ["300"], subsets: ["latin"], style: ["italic"] });

export const Appointments = ({ dataToPrint, opening, UpgradedAppointList }: AppointmentsProps) => {
	const { data: session } = useSession();

	const stateStyles = `${noto.className} ${styles.state}`;
	const stateStylesItalic = `${notoI.className} ${styles.state}`;

	return (
		<>
			{dataToPrint.map((appointment, index) => {
				const KEY = `${index} - ${appointment.time}`;

				const PROPS = {
					index,
					time: appointment.time,
					stateStyles: stateStylesItalic,
					date: opening ? opening.en : TODAY_CUSTOM_EN,
					callback: UpgradedAppointList,
				};

				if (appointment.state === "loading")
					return (
						<div className={styles["appointment-btn__container"]} key={KEY}>
							<LoadingTime {...PROPS} />
						</div>
					);

				if (session) {
					if (appointment.user_id === session?.user?.id)
						return (
							<div className={styles["appointment-btn__container"]} key={KEY}>
								<UserTimeBTN {...PROPS} />
							</div>
						);
				}

				if (appointment.state === "close")
					return (
						<div className={styles["appointment-btn__container"]} key={KEY}>
							<ClosedTimeBTN {...PROPS} />
						</div>
					);

				if (appointment.state === "busy")
					return (
						<div className={styles["appointment-btn__container"]} key={KEY}>
							<BusyTimeBTN
								{...PROPS}
								callback={() => console.log("ocupado")}
								user_id={appointment.user_id}
							/>
						</div>
					);

				return (
					<div className={styles["appointment-btn__container"]} key={KEY}>
						<AvailableTimeBTN {...PROPS} stateStyles={stateStyles} />
					</div>
				);
			})}
		</>
	);
};
