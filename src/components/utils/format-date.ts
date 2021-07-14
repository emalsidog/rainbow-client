// Types
type Style = "BIRTHDAY" | "REGULAR" | "LAST_SEEN_ONLINE" | "TIME" | "FULL_DATE";
type UnpdarsedDate = Date | undefined;

// Minutes and Seconds (1:53)
export const formatToMinutesAndSeconds = (timeInMs: number): string => {
	const date = new Date(timeInMs);

	const seconds = date.getSeconds();
	const minutes = date.getMinutes();

	if (seconds < 10) {
		return `${minutes}:0${seconds}`;
	}

	return `${minutes}:${seconds}`;
};

// REGULAR (Thu, June 17) || BIRTHDAY (April 10, 2001)
export const formatDate = (
	unparsedDate: UnpdarsedDate,
	style: Style
): string | undefined => {
	if (unparsedDate === undefined) {
		return;
	}

	const date = new Date(unparsedDate);

	const parsedMonth = date.getMonth();
	const parsedYear = date.getFullYear();
	const parsedDay = date.getDate();
	const parsedWeekDay = date.getDay();

	const minutes = date.getMinutes();
	const hours = date.getHours();
	const seconds = date.getSeconds();

	switch (style) {
		case "BIRTHDAY":
			return `${formatMonth(parsedMonth)} ${parsedDay}, ${parsedYear}`;

		case "REGULAR":
			const formattedWeekDay = formatDay(parsedWeekDay);
			const formattedMonth = formatMonth(parsedMonth);

			const displayYear =
				parsedYear === new Date().getFullYear()
					? ""
					: `, ${parsedYear}`;

			return `${formattedWeekDay}, ${formattedMonth} ${parsedDay}${displayYear}`;

		case "LAST_SEEN_ONLINE":
			const time = `${hours}:${formatNumber(minutes)}`;
			if (parsedDay === new Date().getDate()) {
				return `last seen at ${time}`;
			}

			if (new Date().getFullYear() - parsedYear > 0) {
				return Math.random() < 0.1
					? "probably dead"
					: "last seen a long time ago";
			}

			return `last seen ${formatMonth(parsedMonth)} ${formatNumber(
				parsedDay
			)} at ${time}`;

		case "TIME":
			return `${hours}:${formatNumber(minutes)}`;
		case "FULL_DATE": {
			const weekDay = formatDay(parsedWeekDay);
			const month = formatMonth(parsedMonth);

			const mins = formatNumber(minutes);
			const secs = formatNumber(seconds);

			return `${weekDay}, ${month} ${parsedDay}, ${parsedYear} ${hours}:${mins}:${secs}`;
		}
	}
};

const formatNumber = (number: number): string => {
	if (number < 10) {
		return `0${number}`;
	}
	return `${number}`;
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
