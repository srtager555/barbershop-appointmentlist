import { Noto_Sans_Display as m } from "@next/font/google";

import { useState } from "react";
import { NextPage } from "next";
import styles from "@styles/citas.module.scss";

const noto = m({ weight: ["400"], subsets: ["latin"] });
const notoI = m({ weight: ["300"], subsets: ["latin"], style: ["italic"] });

const Citas: NextPage = () => {
	const [message, setMessage] = useState("")
	const stateStyles = `${notoI.className} ${styles.state}`;

	const time = [
		"9'00",
		"9'30",
		"10'00",
		"10'30",
		"11'00",
		"11'30",
		"12'00",
		"12'30 - 1'30",
		"2'00",
		"2'30",
		"3'00",
		"3'30",
		"4'00",
		"4'30",
		"5'00",
		"5'30",
		"6'00",
		"6'30",
		"7'00",
		"7'30",
		"8'00",
	];

	//  I need improved this jsx logic, but first I will end the styles
	return (
		<div className={styles["container-appointments"]}>
			<span className={styles["start-time"]}>apertura</span>
			{time.map((time, index) => {
				switch (time) {
					case "10'30":
						return (
							<button
								key={`${index} - ${time}`}
								className={`${styles["appointment-btn"]} ${styles.user}`}
							>
								<span className={styles.time}>{time}</span>
								<span className={styles.line}></span>
								<span className={stateStyles}>cancelar reserva</span>
							</button>
						);

					case "8'00":
					case "12'30 - 1'30":
						return (
							<button
								key={`${index} - ${time}`}
								className={`${styles["appointment-btn"]} ${styles.close}`}
							>
								<span className={styles.time}>{time}</span>
								<span className={styles.line}></span>
								<span className={stateStyles}>PUERTAS CERRADAS</span>
							</button>
						);

					case "4'30":
					case "11'30":
					case "3'30":
					case "5'30":
					case "6'00":
					case "6'30":
					case "7'30":
						return (
							<button
								key={`${index} - ${time}`}
								className={`${styles["appointment-btn"]} ${styles["reserved-appointment"]}`}
							>
								<span className={styles.time}>{time}</span>
								<span className={styles.line}></span>
								<span className={stateStyles}>reservado</span>
							</button>
						);

					default:
						return (
							<button
								key={`${index} - ${time}`}
								className={styles["appointment-btn"]}
							>
								<span className={styles.time}>{time}</span>
								<span className={styles.line}></span>
								<span className={`${styles.state} ${noto.className}`}>
									reservar puesto
								</span>
							</button>
						);
				}
			})}
		</div>
	);
};

export default Citas;
