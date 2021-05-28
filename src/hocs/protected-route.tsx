// Dependencies
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";

// Selectors
import { selectIsAuthenticated } from "../redux/selectors/auth-selector";
import { selectIsFetching } from "../redux/selectors/user-selector";

const ProtectedRoute: React.FC<RouteProps> = (props) => {
	const { ...rest } = props;
	const isAuthenticated: boolean = useSelector(selectIsAuthenticated);
	const isFetching = useSelector(selectIsFetching);

	if (!isAuthenticated && !isFetching) {
		return <Redirect to="/users/login" />;
	}
	return <Route {...rest} />;

};

export default ProtectedRoute;
