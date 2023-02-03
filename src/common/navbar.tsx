import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Fascinate, Prata } from "@next/font/google";

import { Logo } from "./logo";
import { AppointmentNav } from "@components/navbar/AppointmentNav";

import styles from "@styles/navbar.module.scss";

interface ComponentsList {
	path: string;
	navClass: string;
	component: (arg0: unknown) => JSX.Element;
}

const prata = Prata({ preload: true, weight: "400", subsets: ["latin"] });

export function Navbar() {
	const router = useRouter();
	
	const [customClass, setCustomClass] = useState(styles.start);
	const [Nav, setNav] = useState<{ component: () => JSX.Element }>({ component: unClasico });
	const [showTitle, setShowTitle] = useState(true)
	const [scrollDirection, setScrollDirection] = useState(true)
	
	
	useEffect(() => {
		const handleTitleChecker = () => {
			if (window.screenY < 100) setShowTitle(true)
			else setShowTitle(false)
		}

		window.addEventListener("scroll", handleTitleChecker)

		return () => {
			window.removeEventListener("scroll", handleTitleChecker)
		}
	}, [])

	useEffect(() => {
		const content: Array<ComponentsList> = [
			{ path: "/citas", navClass: styles.apointments, component: () => AppointmentNav({ showTitle, scrollDirection }) },
			{ path: "/", navClass: styles.start, component: unClasico },
		];

		const newContent = content.find((element) => element.path === router.asPath);

		if (newContent) {
			setNav({ component: () => newContent.component({ showTitle, scrollDirection }) });
			setCustomClass(newContent.navClass);
		} else {
			setNav({ component: unClasico });
			setCustomClass("");
		}
	}, [router.asPath]);

	return (
		<nav className={`${prata.className} ${styles.container} ${customClass}`}>
			<Logo />
			<div className={styles["custom-content"]}>{Nav.component()}</div>
		</nav>
	);
}

const unClasico = () => <span></span>;
