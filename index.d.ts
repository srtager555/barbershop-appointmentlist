interface appointmentData { 
  id: number;
  time: string;
  state: string;
  user_id: number;
}

interface appointmentsButtons {
  llave: string;
  time: string;
  stateStyles: string;
  callback: Function;
}