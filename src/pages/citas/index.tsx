import { useState, useEffect } from "react"
import { NextPage } from "next";

import Layout from "@components/appointments/Layout";
import useSWR from "swr";
import { AppointmentReducer } from "@common/appointmentReducer";

const fetcher = (url: string) => fetch(url).then((data) => data.json());

const Hoy: NextPage = () => {
	const [processed, setProcessed] = useState<appointmentData[]>()
	const { data, error, isLoading } = useSWR(`/api/appointments/hoy`, fetcher)

	useEffect(() => {
		if (data) {
			setProcessed(AppointmentReducer(data))
		}
	}, [data])

	if (error) return <span>Hubo un error</span>
	if (isLoading) return <span>Loading...</span>

  return <Layout data={processed} />
}

export default Hoy