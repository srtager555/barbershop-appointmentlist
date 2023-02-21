import { useEffect, useState } from "react";

import styles from "@styles/btnToTop.module.scss"

export function ButtonToTop() {
	const [isOverScroll, setIsOverScroll] = useState(false);

	function handlerScroll() {
		if (window.scrollY > 400) setIsOverScroll(true);
		else setIsOverScroll(false);
	}

	useEffect(() => {
		window.addEventListener("scroll", handlerScroll);

		return () => {
			window.removeEventListener("scroll", handlerScroll);
		};
	}, []);

	return (
		<button
			className={`${styles.toTop} ${isOverScroll ? styles.show : ""}`}
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
		>
			⇑
		</button>
	);
}
