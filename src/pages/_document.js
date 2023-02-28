import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/bigoteJossiel.png"></link>
				<meta name="theme-color" content="#fff" />
				<meta name="favicon" content="/bigoteJossiel.png" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
