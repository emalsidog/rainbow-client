// Dependencies
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

// Actions
import { removeNotification } from "../../../../../redux/actions/notifications-actions";

// Styles
import "./notify.css";

// Types
interface NotifyProps {
	id: string;
	message: string;
	isError: boolean;
}

const Notify: React.FC<NotifyProps> = (props) => {
	const { id, message, isError } = props;

	const dispatch = useDispatch();

	const [exit, setExit] = useState<boolean>(false);
	const [width, setWidth] = useState<number>(0);
	const [intervalID, setIntervalID] = useState<number>();

	const handleStartTimer = () => {
		const id: number = window.setInterval(() => {
			setWidth((prev) => {
				if (prev < 100) {
					return prev + 0.5;
				}

				clearInterval(id);
				return prev;
			});
		}, 20);
		setIntervalID(id);
	};

	const handlePauseTimer = () => {
		clearInterval(intervalID);
	};

	const handleCloseNotification = () => {
		setExit(true);
		memoizedHandlePauseTimer();
		setTimeout(() => {
			dispatch(removeNotification(id));
		}, 400);
	};

	const memoizedHandlePauseTimer = useCallback(handlePauseTimer, [
		intervalID,
	]);

	const memoizedHandleCloseNotification = useCallback(
		handleCloseNotification,
		[dispatch, memoizedHandlePauseTimer, id]
	);

	useEffect(() => {
		handleStartTimer();
	}, []);

	useEffect(() => {
		if (width === 100) {
			memoizedHandleCloseNotification();
		}
	}, [width, memoizedHandleCloseNotification]);

	return (
		<div
			onMouseEnter={memoizedHandlePauseTimer}
			onMouseLeave={handleStartTimer}
			className={`notification-item ${
				isError ? "notification-error" : "notification-success"
			} ${exit ? "exit" : ""}`}
		>
			<div className="notification-content">
				<div className="notification-icon">
					{isError ? (
						<i className="fas fa-times"></i>
					) : (
						<i className="fas fa-check"></i>
					)}
				</div>
				<p className="notification-text">{message}</p>
			</div>
			<div
				className="notification-bar"
				style={{ width: `${width}%` }}
			></div>
		</div>

		// <div
		// 	onClick={handleCloseNotification}
		// 	onMouseEnter={handlePauseTimer}
		// 	onMouseLeave={handleStartTimer}
		// 	className={`notification-item ${
		// 		isError ? "notification-error" : "notification-success"
		// 	} ${exit ? "exit" : ""}`}
		// >
		// 	<p>{message}</p>

		// 	<div className="notification-bar" style={{ width: `${width}%` }} />
		// </div>
	);
};

export default Notify;
