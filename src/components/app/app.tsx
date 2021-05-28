// Dependencies
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { getUserRequest } from "../../redux/actions/user-actions";

// Selectors
import { selectIsAuthenticated } from "../../redux/selectors/auth-selector";

// Components
import Login from "../screens/auth/login";
import Register from "../screens/auth/register/register";
import Activate from "../screens/auth/activate";
import Reset from "../screens/auth/reset";

import Profile from "../screens/profile";
import Settings from "../screens/settings";

import Notification from "../common/notification";
import BgAnimation from "../common/bg-animation";

import ProtectedRoute from "../../hocs/protected-route";

const App: React.FC = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(selectIsAuthenticated);

	useEffect(() => {	
		if (!isAuthenticated) {
			dispatch(getUserRequest());
		}
	}, [dispatch, isAuthenticated]);

	return (
		<React.Fragment>
			<Notification />
			<Route
				path={[
					"/users/login",
					"/users/register",
					"/users/reset/:resetToken",
					"/users/activate/:activationToken",
				]}
				component={BgAnimation}
			/>
			<Switch>
				<ProtectedRoute exact path="/settings" component={Settings} />
				<ProtectedRoute exact path="/:profileId" component={Profile} />

				<Route path="/users/login" component={Login} />
				<Route path="/users/register" component={Register} />
				<Route path="/users/activate/:activationToken" component={Activate} />
				<Route path="/users/reset/:resetToken" component={Reset} />

				<Route path="/" render={() => <h1>404</h1>} />
			</Switch>
		</React.Fragment>
	);
};

export default App;
