// Types
type Style = "BIRTHDAY" | "REGULAR";
type UnpdarsedDate = Date | undefined;

export const formatToMinutesAndSeconds = (timeInMs: number): string => {
	const date = new Date(timeInMs);

	const seconds = date.getSeconds();
	const minutes = date.getMinutes();

	if (seconds < 10) {
		return `${minutes}:0${seconds}`;
	}

	return `${minutes}:${seconds}`;
};

export const formatDate = (unparsedDate: UnpdarsedDate, style: Style): string | undefined => {
	if (unparsedDate === undefined) {
		return;
	}

	const date = new Date(unparsedDate);

	const parsedMonth = date.getMonth();
	const parsedYear = date.getFullYear();
	const parsedDay = date.getDate();
	const parsedWeekDay = date.getDay();

	if (style === "BIRTHDAY") {
		return `${formatMonth(parsedMonth)} ${parsedDay}, ${parsedYear}`;
	}

	if (style === "REGULAR") {
		const formattedWeekDay = formatDay(parsedWeekDay);
		const formattedMonth = formatMonth(parsedMonth);
		
		const displayYear = parsedYear === new Date().getFullYear() ? "" : `, ${parsedYear}`;

		return `${formattedWeekDay}, ${formattedMonth} ${parsedDay}${displayYear}`;
	}
};

const formatDay = (day: number): string => {
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	return days[day];
};

const formatMonth = (month: number): string => {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	return months[month];
};
