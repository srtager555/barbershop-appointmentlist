import { useState, useEffect } from "react"
import { NextPage } from "next";

import Layout from "@components/appointments/Layout";
import useSWR from "swr";
import { AppointmentReducer } from "@common/appointmentReducer";

const fetcher = (url: string) => fetch(url).then((data) => data.json());

const Hoy: NextPage = () => {
	const { data, error, isLoading } = useSWR(`/api/appointments/hoy`, fetcher);

	if (error) return <span>Hubo un error</span>
	if (isLoading) return <span>Loading...</span>

  return <Layout data={data} />
}

export default Hoy