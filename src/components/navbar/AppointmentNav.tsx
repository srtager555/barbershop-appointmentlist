import { useEffect, useState } from "react";
import Wl from "wrapping-letters-react";
import { Noto_Sans_Display } from "@next/font/google";

import { ActiveLink } from "@common/ActiveLink";

import styles from "@styles/navbarComponents/AppointmentNav.module.scss";

const NotoSansDisplay = Noto_Sans_Display({ subsets: ["latin"] });

export const AppointmentNav = ({
	showTitle,
	scrollDirection,
}: {
	showTitle: boolean;
	scrollDirection: boolean;
}) => {
	console.log(showTitle)
	return (
		<div className={styles.container}>
			<h2 className={`${styles.title} ${showTitle ? styles.show : ""}`}>Reservas</h2>
			<div className={styles["appointment-day"]}>
				<ActiveLink href="/citas">Hoy</ActiveLink>
				<span className={styles.line}></span>
				<ActiveLink href="/citas/manana">Mañana</ActiveLink>
			</div>
			<div className={styles["state-poster"]}>
				<div className={styles.state}>
					<span className={NotoSansDisplay.className}>✂️ ¡Jossiel esta cortando! 💈</span>
				</div>
				<div className={styles["barber-lantern"]}>
					<div className={styles["lantern-slider"]}>
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
