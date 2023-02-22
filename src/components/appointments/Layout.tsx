import { Noto_Sans_Display as m } from "@next/font/google";

import { NextPage } from "next";
import { useSession } from "next-auth/react";

import { ClosedTimeBTN } from "./ClosedTime.btn";
import { BusyTimeBTN } from "./BusyTime.btn";
import { UserTimeBTN } from "./UserTime.btn";
import { AvailableTimeBTN } from "./AvailableTime.btn";
import { LoadingTime } from "./LoadingTime";

import styles from "@styles/citas.module.scss";
import ClosedDay from "./ClosedDay";

const noto = m({ weight: ["400"], subsets: ["latin"] });
const notoI = m({ weight: ["300"], subsets: ["latin"], style: ["italic"] });

const Layout: NextPage<{ data: appointmentData[] | "closed"; openning?: string }> = ({
	data,
	openning,
}) => {
	const { data: session } = useSession()
	const stateStyles = `${noto.className} ${styles.state}`;
	const stateStylesItalic = `${notoI.className} ${styles.state}`;

	return (
		<div className={styles["container-appointments"]}>
			{data === "closed" ? (
				<ClosedDay />
			) : (
				<>
					<span className={styles["start-time"]}>{openning ? `Reservas del ${openning}` : "apertura"}</span>
					{data.map((appointment, index) => {
						const KEY = `${index} - ${appointment.time}`;

						const PROPS = {
							index,
							time: appointment.time,
							stateStyles: stateStylesItalic,
						};

						if (appointment.state === "loading")
							return (
								<div className={styles["appointment-btn__container"]} key={KEY}>
									<LoadingTime {...PROPS} />
								</div>
							);

							console.log(session?.user?.id, session?.user)
						if (appointment.user_id === session?.user?.id)
							return (
								<div className={styles["appointment-btn__container"]} key={KEY}>
									<UserTimeBTN
										callback={() => console.log("nope")}
										{...PROPS}
									/>
								</div>
							);

						if (appointment.state === "close")
							return (
								<div className={styles["appointment-btn__container"]} key={KEY}>
									<ClosedTimeBTN
										callback={() => console.log("nope")}
										{...PROPS}
									/>
								</div>
							);

						if (appointment.state === "busy")
							return (
								<div className={styles["appointment-btn__container"]} key={KEY}>
									<BusyTimeBTN
										callback={() => console.log("ocupado")}
										{...PROPS}
									/>
								</div>
							);

						return (
							<div className={styles["appointment-btn__container"]} key={KEY}>
								<AvailableTimeBTN
									callback={() => console.log("nice")}
									{...PROPS}
									stateStyles={stateStyles}
								/>
							</div>
						);
					})}
				</>
			)}
		</div>
	);
};

export default Layout;
