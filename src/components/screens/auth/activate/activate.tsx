// Dependencies
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { activateRequest } from "../../../../redux/auth/actions";

// Selectors
import { selectStatus } from "../../../../redux/auth/selector";

// Styles
import "./activate.css";

const Activate: React.FC = () => {
	const dispatch = useDispatch();
	const status = useSelector(selectStatus);

	const { activationToken }: any = useParams();

	useEffect(() => {
		dispatch(activateRequest(activationToken));
	}, [dispatch, activationToken]);

	const { isError, message } = status;

	return (
		<div className="activation-container">
			<div className="activation-wrapper">
				<div className="activation-status">{message}</div>
				<Link
					className="activation-link link"
					to={isError ? "/users/register" : "/users/login"}
				>
					{ isError ? "Back to registration process" : "Login" }
				</Link>
			</div>
		</div>
	);
};

export default Activate;
