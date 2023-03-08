import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Prata, Noto_Sans_Display } from "@next/font/google";
import { useSession } from "next-auth/react";
import useSWR from "swr";

import { Logo } from "./logo";
import { AppointmentNav } from "@components/navbar/AppointmentNav";
import Link from "next/link";

import styles from "@styles/navbar.module.scss";
import indexStyles from "@styles/index.module.scss";

interface ComponentsList {
	path: string | string[];
	navClass: string;
	component: (arg0: unknown) => JSX.Element;
}

const prata = Prata({ preload: true, weight: "400", subsets: ["latin"] });
const Noto = Noto_Sans_Display({ preload: true, weight: "400", subsets: ["latin"] });

const fetcher = (url: string) => fetch(url).then((data) => data.json());

export function Navbar() {
	const router = useRouter();
	const { data: session, status } = useSession();

	const data: "closed" | appointmentData[] = useSWR("/api/appointments/hoy", fetcher).data;
	const [customClass, setCustomClass] = useState(styles.start);
	const [Nav, setNav] = useState<{ component: () => JSX.Element }>({ component: unClasico });
	const [showTitle, setShowTitle] = useState(true);
	const [scrollDirection, setScrollDirection] = useState(true);
	const [lastScrollPosition, setLastScrollPosition] = useState(0);
	const [showProfileLink, setShowProfileLink] = useState(false);

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
		const path = router.asPath;
		const bannedPaths = ["/perfil", "/login", "/registrar"];

		if (bannedPaths.some((el) => el === path)) setShowProfileLink(false);
		else setShowProfileLink(true);
	}, [router.asPath]);

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
		<>
			<Link
				className={`${Noto.className} ${indexStyles["btn-action"]} ${indexStyles.profile} ${
					styles["profile-link"]
				} ${!showProfileLink ? styles.hidden : ""}`}
				href="/perfil"
			>
				{status === "authenticated" ? session.user.name[0] : "iniciar sesión"}
			</Link>

			<nav className={`${prata.className} ${styles.container} ${customClass}`}>
				<Link href="/citas">
					<Logo />
				</Link>
				<div className={styles["custom-content"]}>{Nav.component()}</div>
			</nav>
		</>
	);
}

const unClasico = () => <span></span>;
