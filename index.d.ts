type state = "close" | "loading" | null | "busy" | "open";
type user_id = number | null;
type Time = time | "0";

type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
	? Acc[number]
	: Enumerate<N, [...Acc, Acc["length"]]>;

type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

type T = Range<20, 100>;

interface timeDate {
	day: Range<0, 6>;
	date: Range<0, 30>;
	year: number;
}
interface appointmentData {
	id: number;
	time: Time;
	state: state;
	user_id: user_id;
}

interface rawAppointmentData extends appointmentData {
	isOpening: boolean;
	isClosing: boolean;
}

interface appointmentsButtons {
	time: Time;
	stateStyles: string;
	date: string;
	callback?: Function;
}

interface rawAppointments {
	id: number;
	date: string;
	user_id: user_id;
	time: Time;
}

interface customClosedTime {
	id: number;
	date: string;
	time: Time;
}

interface AppointAPIBody {
	time: string;
	user_id: number;
	date: string;
	createNewAppoint?: boolean;
}

interface AppointAPIResponse {
	hasAppointment?: boolean;
}

type time = string;
'00"00' |
	'00"20' |
	'00"40' |
	'01"00' |
	'01"20' |
	'01"40' |
	'02"00' |
	'02"20' |
	'02"40' |
	'03"00' |
	'03"20' |
	'03"40' |
	'04"00' |
	'04"20' |
	'04"40' |
	'05"00' |
	'05"20' |
	'05"40' |
	'06"00' |
	'06"20' |
	'06"40' |
	'07"00' |
	'07"20' |
	'07"40' |
	'08"00' |
	'08"20' |
	'08"40' |
	'09"00' |
	'09"20' |
	'09"40' |
	'10"00' |
	'10"20' |
	'10"40' |
	'11"00' |
	'11"20' |
	'11"40' |
	'12"00' |
	'12"20' |
	'12"40' |
	'13"00' |
	'13"20' |
	'13"40' |
	'14"00' |
	'14"20' |
	'14"40' |
	'15"00' |
	'15"20' |
	'15"40' |
	'16"00' |
	'16"20' |
	'16"40' |
	'17"00' |
	'17"20' |
	'17"40' |
	'18"00' |
	'18"20' |
	'18"40' |
	'19"00' |
	'19"20' |
	'19"40' |
	'20"00' |
	'20"20' |
	'20"40' |
	'21"00' |
	'21"20' |
	'21"40' |
	'22"00' |
	'22"20' |
	'22"40' |
	'23"00' |
	'23"20' |
	'23"40' |
	'24"00';

type ArrayTime = Array<
	| string
	| '00"00'
	| '00"20'
	| '00"40'
	| '01"00'
	| '01"20'
	| '01"40'
	| '02"00'
	| '02"20'
	| '02"40'
	| '03"00'
	| '03"20'
	| '03"40'
	| '04"00'
	| '04"20'
	| '04"40'
	| '05"00'
	| '05"20'
	| '05"40'
	| '06"00'
	| '06"20'
	| '06"40'
	| '07"00'
	| '07"20'
	| '07"40'
	| '08"00'
	| '08"20'
	| '08"40'
	| '09"00'
	| '09"20'
	| '09"40'
	| '10"00'
	| '10"20'
	| '10"40'
	| '11"00'
	| '11"20'
	| '11"40'
	| '12"00'
	| '12"20'
	| '12"40'
	| '13"00'
	| '13"20'
	| '13"40'
	| '14"00'
	| '14"20'
	| '14"40'
	| '15"00'
	| '15"20'
	| '15"40'
	| '16"00'
	| '16"20'
	| '16"40'
	| '17"00'
	| '17"20'
	| '17"40'
	| '18"00'
	| '18"20'
	| '18"40'
	| '19"00'
	| '19"20'
	| '19"40'
	| '20"00'
	| '20"20'
	| '20"40'
	| '21"00'
	| '21"20'
	| '21"40'
	| '22"00'
	| '22"20'
	| '22"40'
	| '23"00'
	| '23"20'
	| '23"40'
	| '24"00'
>;
