import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Logo } from "./logo";
import { ActiveLink } from "./ActiveLink";

import styles from "@styles/navbar.module.scss";

interface ComponentsList {
	path: string;
	navClass: string;
	component: () => JSX.Element;
}

export function Navbar() {
	const router = useRouter();

	const [customClass, setCustomClass] = useState(styles.start);
	const [Nav, setNav] = useState<{ component: () => JSX.Element }>({ component: unClasico });

	useEffect(() => {
		const content: Array<ComponentsList> = [
			{ path: "/citas", navClass: styles.apointments, component: AppointmentContent },
			{ path: "/", navClass: styles.start, component: unClasico },
		];

		const newContent = content.find((element) => element.path === router.asPath);

		if (newContent) {
			setNav({ component: newContent.component });
			setCustomClass(newContent.navClass);
		} else {
			setNav({ component: unClasico });
			setCustomClass("");
		}
	}, [router.asPath]);

	return (
		<nav className={`${styles.container} ${customClass}`}>
			<Logo />
			<div className={`custom-content`}>{Nav.component()}</div>
		</nav>
	);
}

const AppointmentContent = () => {
	return (
		<>
			<h2>Reservas</h2>
			<div className="appointment-day">
				<ActiveLink href="citas/">Hoy</ActiveLink>
				<span className="line"></span>
				<ActiveLink href="citas/">Mañana</ActiveLink>
			</div>
		</>
	);
};

const unClasico = () => <span></span>;
