import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Prata } from "@next/font/google";
import useSWR from "swr"

import { Logo } from "./logo";
import { AppointmentNav } from "@components/navbar/AppointmentNav";

import styles from "@styles/navbar.module.scss";

interface ComponentsList {
	path: string | string[];
	navClass: string;
	component: (arg0: unknown) => JSX.Element;
}

const prata = Prata({ preload: true, weight: "400", subsets: ["latin"] });

const fetcher = (url: string) => fetch(url).then((data) => data.json())

export function Navbar() {
	const router = useRouter();

	const data: "closed" | appointmentData[] = useSWR('/api/appointments/hoy', fetcher).data
	const [customClass, setCustomClass] = useState(styles.start);
	const [Nav, setNav] = useState<{ component: () => JSX.Element }>({ component: unClasico });
	const [showTitle, setShowTitle] = useState(true);
	const [scrollDirection, setScrollDirection] = useState(true);
	const [lastScrollPosition, setLastScrollPosition] = useState(0);

	const handleTitleChecker = () => {
		if (window.scrollY <= 0) setShowTitle(true);
		else setShowTitle(false);
	};

	useEffect(() => {
		const handleScrollDirection = () => {
			if (window.scrollY <= 0) {
				setScrollDirection(true);
				setLastScrollPosition(window.scrollY);
			} else if (lastScrollPosition < window.scrollY) {
				setScrollDirection(false);
				setLastScrollPosition(window.scrollY);
			} else {
				setScrollDirection(true);
				setLastScrollPosition(window.scrollY);
			}
		};

		window.addEventListener("scroll", handleTitleChecker);
		window.addEventListener("scroll", handleScrollDirection);

		return () => {
			window.removeEventListener("scroll", handleTitleChecker);
			window.removeEventListener("scroll", handleScrollDirection);
		};
	}, [lastScrollPosition]);

	useEffect(() => {
		const content: Array<ComponentsList> = [
			{
				path: ["/citas", "/citas/despues"],
				navClass: styles.apointments,
				component: () => AppointmentNav({ showTitle, scrollDirection, isClosed: data }),
			},
			{ path: "/", navClass: styles.start, component: unClasico },
		];

		const newContent = content.find((element) => {
			if (Array.isArray(element.path)) {
				return element.path.some((el) => el === router.asPath);
			} else return element.path === router.asPath;
		});

		if (newContent) {
			setNav({ component: () => newContent.component({ showTitle, scrollDirection }) });
			setCustomClass(newContent.navClass);
		} else {
			setNav({ component: unClasico });
			setCustomClass("");
		}
	}, [router.asPath, scrollDirection, showTitle, data]);

	return (
		<nav className={`${prata.className} ${styles.container} ${customClass}`}>
			<Logo />
			<div className={styles["custom-content"]}>{Nav.component()}</div>
		</nav>
	);
}

const unClasico = () => <span></span>;
