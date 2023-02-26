import { NextPage } from "next";
import { useState } from "react";

import { AppointmentDays } from "@components/appointments/AppointmentDays";
import Layout from "@components/appointments/Layout";

const Despues: NextPage = () => {
	const [dataDays, setDataDays] = useState<appointmentData[] | "closed">();
	const [opening, setOpening] = useState<string>();

	if (!dataDays) return <AppointmentDays setDataDays={setDataDays} setOpening={setOpening} />;

	return <Layout data={dataDays} opening={opening} />;
};

export default Despues;
