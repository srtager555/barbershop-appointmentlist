import { NextPage } from "next";
import { signOut } from "next-auth/react";
import { useState, useEffect, useCallback, useRef } from "react";

import { Appointments } from "./Appointments";
import styles from "@styles/citas.module.scss";
import ClosedDay from "./ClosedDay";

const Layout: NextPage<{ data: appointmentData[] | "closed"; opening?: string }> = ({
	data,
	opening,
}) => {
	const btnContainer = useRef<HTMLDivElement>(document.createElement("div"));

	const [dataToPrint, setDataToPrint] = useState<appointmentData[] | "closed">(data);
	const [firstTimeToScroll, setFirstTimeToScroll] = useState(true);

	const handlerUpgradedAppointList = useCallback(async () => {
		const PATH = opening ? "tomorrow" : "hoy";
		const URL = `/api/appointments/${PATH}`;
		const OPTIONS_TOMORROW = {
			method: "POST",
			body: JSON.stringify({ date: opening }),
		};
		const OPTIONS = opening ? OPTIONS_TOMORROW : undefined;

		const DATA = await fetch(URL, OPTIONS).then((data) => data.json());

		if (JSON.stringify(dataToPrint) != JSON.stringify(DATA)) setDataToPrint(DATA);
	}, [opening, dataToPrint]);

	// I added an interval to listener the ddbb to check if is there new appointments
	useEffect(() => {
		const INTERVAL = setInterval(() => handlerUpgradedAppointList(), 3000);

		return () => {
			clearInterval(INTERVAL);
		};
	}, [handlerUpgradedAppointList]);

	// here the code will center the current available appointment
	useEffect(() => {
		const APPOINTMENTS = btnContainer.current.children;

		if (data && firstTimeToScroll) {
			setFirstTimeToScroll(false);

			setTimeout(() => {
				for (let index = 0; index < APPOINTMENTS.length; index++) {
					const element = APPOINTMENTS.item(index);

					if (element && element.children.length > 0) {
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
			}, 500);
		}
	}, [data, firstTimeToScroll]);

	return (
		<div ref={btnContainer} className={styles["container-appointments"]}>
			{dataToPrint === "closed" ? (
				<ClosedDay />
			) : (
				<>
					<span onClick={() => signOut()} className={styles["start-time"]}>
						{opening ? `Reservas del ${opening}` : "apertura"}
					</span>
					<Appointments
						opening={opening}
						dataToPrint={dataToPrint}
						UpgradedAppointList={handlerUpgradedAppointList}
					/>
				</>
			)}
		</div>
	);
};

export default Layout;
