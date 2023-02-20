import { TODAY, months, week } from "@common/timeData";

export function AppointmentDays(setDataDays: any) {
	function handlerCreateDate(daysToPlus: number) {
		let date = TODAY.getUTCDate() + daysToPlus;
		let month = TODAY.getUTCMonth();
		let year = TODAY.getUTCFullYear();

		if (date > 31) {
			date = date - 31;
			month = month + 1;
		}

		if (month > 12) {
			month = month - 12;
			year = year + 1;
		}

		return `${months[month]} ${date} ${year}`;
	}

	async function handlerSetDate(n: number) {
		const fecha = handlerCreateDate(n);

		setDataDays(
			await fetch(`${process.env.URL}/api/appointment/tomorrow`, {
				method: "POST",
				body: JSON.stringify({ date: fecha }),
			}).then((data) => data.json())
		);
	}

	return (
		<div className={style.container}>
			{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((el) => {
				const TIME = new Date(handlerCreateDate(el));

				return (
					<button key={`btn-${el}`} onClick={() => handlerSetDate(el)}>
						{week[TIME.getUTCDay()]} - {TIME.getUTCDate()}
					</button>
				);
			})}
		</div>
	);
}
