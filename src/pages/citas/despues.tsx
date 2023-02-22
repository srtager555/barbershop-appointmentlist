import { TODAY } from "@common/timeData"
import { AppointmentDays } from "@components/appointments/AppointmentDays"
import Layout from "@components/appointments/Layout"
import { NextPage } from "next"

import { useState } from "react"

const Despues: NextPage = () => {
  const [dataDays, setDataDays] = useState<appointmentData[] | "closed">()
  const [openning, setOpenning] = useState<string>()

  if (!dataDays) return <AppointmentDays setDataDays={setDataDays} setOpenning={setOpenning} />

  return <Layout data={dataDays} openning={openning} />
}

export default Despues