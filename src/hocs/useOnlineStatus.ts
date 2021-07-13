// Dependencies
import { useEffect, useState } from "react";

// Utils
import { AxiosPostRequest } from "../redux/utils/server-request";

// Types
interface OnlineStatus {
	isOnline: boolean;
	status: string;
	lastSeenOnline: Date | undefined;
}

export const useOnlineStatus = (userId: string): OnlineStatus => {
	const [onlineStatus, setOnlineStatus] = useState<OnlineStatus>({
		isOnline: false,
		status: "offline",
		lastSeenOnline: undefined,
	});

	useEffect(() => {
		const getLastSeen = async () => {
			const { data } = await AxiosPostRequest("/users/last-seen", {
				userId,
			});
			return data;
		};

		if (userId) {
			getLastSeen()
				.then((data) => {
					setOnlineStatus(data);
				})
				.catch(() => {
					setOnlineStatus({
						isOnline: false,
						lastSeenOnline: undefined,
						status: "Unable to fetch data",
					});
				});
		}
	}, [userId]);

	return onlineStatus;
};
