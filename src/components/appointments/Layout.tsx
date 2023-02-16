import { Noto_Sans_Display as m } from "@next/font/google";

import { NextPage } from "next";
import { useEffect } from "react";

import { ClosedTimeBTN } from "./ClosedTime.btn";
import { BusyTimeBTN } from "./BusyTime.btn";
import { UserTimeBTN } from "./UserTime.btn";
import { AvailableTimeBTN } from "./AvailableTime.btn";

import styles from "@styles/citas.module.scss";

const noto = m({ weight: ["400"], subsets: ["latin"] });
const notoI = m({ weight: ["300"], subsets: ["latin"], style: ["italic"] });

const Layout: NextPage<{ data: appointmentData[] }> = ({ data }) => {
	const stateStyles = `${noto.className} ${styles.state}`;
	const stateStylesItalic = `${notoI.className} ${styles.state}`;

	return (
		<div className={styles["container-appointments"]}>
			<span className={styles["start-time"]}>apertura</span>
			{data.map((appointment, index) => {
				const KEY = `${index} - ${appointment.time}`;

				const PROPS = {
					llave: KEY,
					index,
					time: appointment.time,
					stateStyles: stateStylesItalic,
				};

				if (appointment.state === "close") 
					return <ClosedTimeBTN callback={() => console.log("nope")} {...PROPS} />;
				
				if (appointment.user_id != null) 
					return <BusyTimeBTN callback={() => console.log("ocupado")} {...PROPS} />;
				
				return (
					// eslint-disable-next-line react/jsx-key
					<AvailableTimeBTN
						callback={() => console.log("nice")}
						{...PROPS}
						stateStyles={stateStyles}
					/>
				);
			})}
		</div>
	);
};

export default Layout;
