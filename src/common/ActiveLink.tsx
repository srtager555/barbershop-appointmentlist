import { useRouter } from "next/router";
import { MouseEvent, ReactElement } from "react";

export function ActiveLink({ children, href }: { href: string; children: ReactElement | string }) {
	const router = useRouter();
	const style = {
		color: router.asPath === href ? "#ad6060" : "inherit",
	};

	const handleClick = (e: MouseEvent) => {
		e.preventDefault();
		router.push(href);
	};

	return (
		<a href={href} onClick={handleClick} style={style}>
			{children}
		</a>
	);
}
