// Dependencies
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Selectors
import { selectOnlineUsers } from "../redux/user/selector";

// Utils
import { AxiosPostRequest } from "../redux/utils/server-request";
import { formatDate } from "../components/utils/format-date";

// Types
interface OnlineStatus {
	isOnline: boolean;
	status: string;
}

export const useOnlineStatus = (userId: string): OnlineStatus => {
	const [onlineStatus, setOnlineStatus] = useState<OnlineStatus>({
		isOnline: false,
		status: "",
	});

	const onlineUsers = useSelector(selectOnlineUsers);

	useEffect(() => {
		const getLastSeen = async () => {
			const { data } = await AxiosPostRequest("/users/last-seen", {
				userId,
			});
			return data.lastSeenOnline;
		};
		if (onlineUsers.includes(userId)) {
			setOnlineStatus({ isOnline: true, status: "online" });
		} else {
			userId &&
				getLastSeen()
					.then((lastSeenOnline) => {
						const date = formatDate(
							lastSeenOnline,
							"LAST_SEEN_ONLINE"
						);
						date &&
							setOnlineStatus({ isOnline: false, status: date });
					})
					.catch(() => {
						setOnlineStatus({
							isOnline: false,
							status: "Unable to fetch data",
						});
					});
		}
	}, [userId, onlineUsers]);

	return onlineStatus;
};
