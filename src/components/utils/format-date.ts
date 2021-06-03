export const formatToMinutesAndSeconds = (timeInMs: number): string => {
	const date = new Date(timeInMs);

	const seconds = date.getSeconds();
	const minutes = date.getMinutes();

	if (seconds < 10) {
		return `${minutes}:0${seconds}`;
	}

	return `${minutes}:${seconds}`;
};

export const formatDate = (unparsedDate: Date | undefined): string | undefined => {
	if (unparsedDate === undefined) {
		return;
	}

	const date = new Date(unparsedDate);

	const parsedWeekDay = date.getDay();
	const parsedMonth = date.getMonth();

	const weekDay = formatDay(parsedWeekDay);
	const month = formatMonth(parsedMonth);
	const day = date.getDate();
	const year = date.getFullYear();

	const fullDate = `${weekDay}, ${month} ${day} ${
		year === new Date().getFullYear() ? "" : year
	}`;

	return fullDate;
};

export const formatBirthday = (unparsedDate: Date | undefined): string | undefined => {
	if (unparsedDate === undefined) {
		return;
	}

	const date = new Date(unparsedDate);

	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();

	return `${formatMonth(month)} ${day}, ${year}`;
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
