import Link from "next/link";
import { useEffect, useState } from "react";
import { TODAY, months, week } from "@common/timeData";

import styles from "@styles/depues.module.scss";

export function AppointmentDays(setDataDays: any) {
	const [isOverScroll, setIsOverScroll] = useState(false);

	function handlerScroll() {
		if (window.scrollY > 400) setIsOverScroll(true);
		else setIsOverScroll(false);
	}

	function handlerCreateDate(daysToPlus: number) {
		let date = TODAY.getUTCDate() + daysToPlus;
		let month = TODAY.getUTCMonth();
		let year = TODAY.getUTCFullYear();

		const isLeapYears = (year: number) => {
			return year % 400 === 0 ? true : year % 100 === 0 ? false : year % 4 === 0;
		};

		if (month === 1) {
			if (isLeapYears(year)) {
				if (date > 29) {
					date = date - 29;
					month = month + 1;
				}
			} else {
				if (date > 28) {
					date = date - 28;
					month = month + 1;
				}
			}
		} else {
			if (date > 31) {
				date = date - 31;
				month = month + 1;
			}
		}

		if (month > 12) {
			month = month - 12;
			year = year + 1;
		}

		return `${months[month]} ${date} ${year}`;
	}

	async function handlerSetDate(n: number) {
		const fecha = handlerCreateDate(n);

		setDataDays(
			await fetch(`${process.env.URL}/api/appointment/tomorrow`, {
				method: "POST",
				body: JSON.stringify({ date: fecha }),
			}).then((data) => data.json())
		);
	}

	useEffect(() => {
		window.addEventListener("scroll", handlerScroll);

		return () => {
			window.removeEventListener("scroll", handlerScroll);
		};
	}, []);

	return (
		<div className={styles.container}>
			<button
				className={`${styles.toTop} ${isOverScroll ? styles.show : ""}`}
				onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			>
				⇑
			</button>
			<Link href="/citas" className={styles.return}>
				<span className={styles.arrow}>↼</span>{" "}
				<span className={styles.text}>Regresar al presente</span>
			</Link>
			<p className={styles["example-text"]}>Selecciona uno de los siguientes días</p>
			<div className={styles.container__button}>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((el) => {
					const TIME = new Date(handlerCreateDate(el));

					return (
						<button
							className={styles.button}
							key={`btn-${el}`}
							onClick={() => handlerSetDate(el)}
						>
							{week[TIME.getUTCDay()]} - {TIME.getUTCDate()}
						</button>
					);
				})}
			</div>
		</div>
	);
}
