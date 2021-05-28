export const formatToMinutesAndSeconds = (timeInMs: number): string => {
	const date = new Date(timeInMs);

	const seconds = date.getSeconds();
	const minutes = date.getMinutes();

	if (seconds < 10) {
		return `${minutes}:0${seconds}`;
	}

	return `${minutes}:${seconds}`;
};
