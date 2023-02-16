import { Noto_Sans_Display as m } from "@next/font/google";

import { useEffect } from "react";
import { NextPage } from "next";

import styles from "@styles/citas.module.scss";
import { ClosedTimeBTN } from "./ClosedTime.btn";
import { BusyTimeBTN } from "./BusyTime.btn";
import { UserTimeBTN } from "./UserTime.btn";

const noto = m({ weight: ["400"], subsets: ["latin"] });
const notoI = m({ weight: ["300"], subsets: ["latin"], style: ["italic"] });

const Layout: NextPage<{ data: appointmentData[] }> = ({ data }) => {
	const stateStyles = `${noto.className} ${styles.state}`;
	const stateStylesItalic = `${notoI.className} ${styles.state}`;

	//  I need improved this jsx logic, but first I will end the styles
	return (
		<div className={styles["container-appointments"]}>
			<span className={styles["start-time"]}>apertura</span>
			{data.map((appointment, index) => {
				const KEY = `${index} - ${appointment.time}`;

				const PROPS = {
					index,
					time: appointment.time,
					stateStyles: stateStylesItalic,
				};

				if (appointment.state === "close") {
					return (
						<ClosedTimeBTN key={KEY} callback={() => console.log("nope")} {...PROPS} />
					);
				}

				if (appointment.user_id != null) {
					return (
						<BusyTimeBTN key={KEY} callback={() => console.log("ocupado")} {...PROPS} />
					);
				}

				return (
					<UserTimeBTN
						key={KEY}
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
