import Head from "next/head";
import { Prata } from "@next/font/google";
import { SessionProvider } from "next-auth/react";
import { Background } from "src/common/background";
import { Navbar } from "src/common/navbar";

import "../styles/globals.css";
import type { AppProps } from "next/app";

const prata = Prata({ preload: true, weight: "400", subsets: ["latin"] });

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {
	return (
		<SessionProvider session={session}>
			<Head>
				<title>Barberia Jossiel</title>
			</Head>
			<Background />
			<Navbar />
			<main className={prata.className}>
				<Component {...pageProps} />
			</main>
		</SessionProvider>
	);
}

export default MyApp;
