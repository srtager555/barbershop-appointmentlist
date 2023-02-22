import Wl from "wrapping-letters-react";
import { Noto_Sans_Display } from "@next/font/google";

import { ActiveLink } from "@common/ActiveLink";

import styles from "@styles/navbarComponents/AppointmentNav.module.scss";

const NotoSansDisplay = Noto_Sans_Display({ subsets: ["latin"] });

export const AppointmentNav = ({
	showTitle,
	scrollDirection,
	isClosed
}: {
	showTitle: boolean;
	scrollDirection: boolean;
	isClosed: "closed" | appointmentData[]
}) => {
	const CLOSED = isClosed === "closed"

	return (
		<div className={styles.container}>
			<h2 className={`${styles.title} ${showTitle ? styles.show : ""}`}>Reservas</h2>
			<div className={`${styles["appointment-day"]} ${scrollDirection ? styles.show : ""}`}>
				<ActiveLink href="/citas">Hoy</ActiveLink>
				<span className={styles.line}></span>
				<ActiveLink href="/citas/despues">Después</ActiveLink>
			</div>
			<div className={`${styles["state-poster"]}${CLOSED ? "" : ` ${styles.open}`}`}>
				<div className={styles.state}>
					<span className={NotoSansDisplay.className}>
						{CLOSED ? "¡Cerrado!" : "✂️ ¡Jossiel esta cortando! 💈"}
					</span>
				</div>
				<div className={styles["barber-lantern"]}>
					<div className={`${styles["lantern-slider"]}${CLOSED ? "" : ` ${styles.open}`}`}>
						<Wl
							text="ioioioioioioio"
							textOptions={{
								ClassToAdd: styles["lantern-bar"],
								SelectClass: {
									wordToSearch: ["o", "i"],
									classToAdd: [styles.red, styles.blue],
								},
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
