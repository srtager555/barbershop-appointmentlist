import { Prata } from "@next/font/google"

import '../styles/globals.css'
import type { AppProps } from 'next/app'

const prata = Prata({ preload: true, weight: "400", subsets: ["latin"]})

function MyApp({ Component, pageProps }: AppProps) {


  return (<main className={prata.className}><Component {...pageProps} /></main>)
}

export default MyApp
