import { Noto_Sans_Display as m } from "@next/font/google";

import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect, useCallback, useRef } from "react";

import { ClosedTimeBTN } from "./ClosedTime.btn";
import { BusyTimeBTN } from "./BusyTime.btn";
import { UserTimeBTN } from "./UserTime.btn";
import { AvailableTimeBTN } from "./AvailableTime.btn";
import { LoadingTime } from "./LoadingTime";
import { TODAY_CUSTOM } from "@common/timeData";

import styles from "@styles/citas.module.scss";
import ClosedDay from "./ClosedDay";

const noto = m({ weight: ["400"], subsets: ["latin"] });
const notoI = m({ weight: ["300"], subsets: ["latin"], style: ["italic"] });

const Layout: NextPage<{ data: appointmentData[] | "closed"; openning?: string }> = ({
	data,
	openning,
}) => {
	const { data: session } = useSession();
	const btnContainer = useRef<HTMLDivElement>(document.createElement("div"));

	const [dataToPrint, setDataToPrint] = useState<appointmentData[] | "closed">(data);

	const stateStyles = `${noto.className} ${styles.state}`;
	const stateStylesItalic = `${notoI.className} ${styles.state}`;

	const handlerUpgradedAppointList = useCallback(async () => {
		const URL = openning ? "tomorrow" : "hoy";

		const DATA = await fetch(
			`/api/appointments/${URL}`,
			openning
				? {
						method: "POST",
						body: JSON.stringify({ date: openning }),
				  }
				: {}
		).then((data) => data.json());

		if (JSON.stringify(dataToPrint) != JSON.stringify(DATA)) setDataToPrint(DATA);
	}, [openning, dataToPrint]);

	useEffect(() => {
		const INTERVAL = setInterval(() => handlerUpgradedAppointList(), 1000);

		return () => {
			clearInterval(INTERVAL);
		};
	}, [handlerUpgradedAppointList]);

	useEffect(() => {
		setTimeout(() => {
			const APPOINTMENTS = btnContainer.current.children;

			for (let index = 0; index < APPOINTMENTS.length; index++) {
				const element = APPOINTMENTS.item(index);

				if (!element) return;

				if (element.children.length > 0) {
					// @ts-ignore
					if (element.children[0].disabled === false) {
						element.scrollIntoView({
							block: "center",
							behavior: "smooth",
						});

						break;
					}
				}
			}
		}, 100);
	}, []);

	return (
		<div ref={btnContainer} className={styles["container-appointments"]}>
			{dataToPrint === "closed" ? (
				<ClosedDay />
			) : (
				<>
					<span onClick={() => signOut()} className={styles["start-time"]}>
						{openning ? `Reservas del ${openning}` : "apertura"}
					</span>
					{dataToPrint.map((appointment, index) => {
						const KEY = `${index} - ${appointment.time}`;

						const PROPS = {
							index,
							time: appointment.time,
							stateStyles: stateStylesItalic,
							date: openning ? openning : TODAY_CUSTOM,
							callback: handlerUpgradedAppointList,
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
									<ClosedTimeBTN
										{...PROPS}
										callback={() => console.log("nope")}
									/>
								</div>
							);

						if (appointment.state === "busy")
							return (
								<div className={styles["appointment-btn__container"]} key={KEY}>
									<BusyTimeBTN
										{...PROPS}
										callback={() => console.log("ocupado")}
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
			)}
		</div>
	);
};

export default Layout;
