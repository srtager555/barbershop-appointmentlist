/**
 * @description This function will removed the first closed times from the data
 * @param  {appointmentData[]} data An array with the data from appointments
 * @returns {appointmentData[]} Will return the appointment array without the first closed times
 */
export function AppointmentReducer(data: appointmentData[]): appointmentData[] {
  const OpeningTime = data.find((el) =>  el.state === "open")
  let OpeningTimeIndex: number;
  
  if (OpeningTime) {
    OpeningTimeIndex = data.indexOf(OpeningTime)

    const firstClosedDataRemoved = data.splice(OpeningTimeIndex)
    data = firstClosedDataRemoved
  } 

  return data
}