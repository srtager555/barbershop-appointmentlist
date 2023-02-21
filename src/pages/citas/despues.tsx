import { AppointmentDays } from "@components/appointments/AppointmentDays"
import Layout from "@components/appointments/Layout"
import { NextPage } from "next"

import { useState } from "react"

const Despues: NextPage = () => {
  const [dataDays, setDataDays] = useState<appointmentData[] | undefined>()

  if (!dataDays) return <AppointmentDays setDataDays={setDataDays} />

  return <Layout data={dataDays} />
}

export default Despues