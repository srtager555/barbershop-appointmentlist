export function TimeList(
	OpeningClosing: { opening: Time; closing: Time; closed: boolean } | undefined | null,
	appointments: rawAppointments[] | undefined,
	closedTime: customClosedTime[] | undefined
): Array<appointmentData> {
  if(!OpeningClosing) return []

  const OPENING_index_time = TIME_LIST.indexOf(OpeningClosing.opening.replace(":", '"'))
  const CLOSING_index_time = TIME_LIST.indexOf(OpeningClosing.closing.replace(":", '"'))

	const RESULT: Array<appointmentData> = TIME_LIST.map((element, index) => {
		let state: state = "open";
		let user_id: user_id = null;

		const IS_CLOSED = closedTime?.find((close) => close.time === element);
		const IS_BUSY: rawAppointments | undefined = appointments?.find(
			(appoint) => appoint.time === element
		);

    if (OPENING_index_time > index) state = "close"
    else if (CLOSING_index_time <= index) state = "close"
		else if (IS_CLOSED) state = "close";
		else if (IS_BUSY) {
			state = "busy";
			user_id = IS_BUSY.user_id;
		}

		return {
			id: index,
			time: element,
			state,
			user_id,
		};
	});

	return RESULT;
}

export const TIME_LIST: ArrayTime = [
	'00"00',
	'00"20',
	'00"40',
	'01"00',
	'01"20',
	'01"40',
	'02"00',
	'02"20',
	'02"40',
	'03"00',
	'03"20',
	'03"40',
	'04"00',
	'04"20',
	'04"40',
	'05"00',
	'05"20',
	'05"40',
	'06"00',
	'06"20',
	'06"40',
	'07"00',
	'07"20',
	'07"40',
	'08"00',
	'08"20',
	'08"40',
	'09"00',
	'09"20',
	'09"40',
	'10"00',
	'10"20',
	'10"40',
	'11"00',
	'11"20',
	'11"40',
	'12"00',
	'12"20',
	'12"40',
	'13"00',
	'13"20',
	'13"40',
	'14"00',
	'14"20',
	'14"40',
	'15"00',
	'15"20',
	'15"40',
	'16"00',
	'16"20',
	'16"40',
	'17"00',
	'17"20',
	'17"40',
	'18"00',
	'18"20',
	'18"40',
	'19"00',
	'19"20',
	'19"40',
	'20"00',
	'20"20',
	'20"40',
	'21"00',
	'21"20',
	'21"40',
	'22"00',
	'22"20',
	'22"40',
	'23"00',
	'23"20',
	'23"40',
	'24"00',
];
