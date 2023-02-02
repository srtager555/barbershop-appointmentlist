import { useRouter } from "next/router";
import { MouseEvent, ReactElement } from "react";

export function ActiveLink({ children, href }: { href: string; children: ReactElement | string }) {
	const router = useRouter();
	const style = {
		marginRight: 10,
		color: router.asPath === href ? "red" : "black",
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
