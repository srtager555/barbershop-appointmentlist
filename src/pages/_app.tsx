import Head from "next/head";
import { Prata } from "@next/font/google";
import { Background } from "src/common/background";

import "../styles/globals.css";
import type { AppProps } from "next/app";

const prata = Prata({ preload: true, weight: "400", subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Barberia Jossiel</title>
			</Head>
			<Background />
			<main className={prata.className}>
				<Component {...pageProps} />
			</main>
		</>
	);
}

export default MyApp;
