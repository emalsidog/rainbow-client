// Dependencies
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// Actions
import { getUserRequest } from "../../redux/user/actions";

// Selectors
import { selectIsAuthenticated } from "../../redux/auth/selector";

// Components
import Login from "../screens/auth/login";
import Register from "../screens/auth/register/register";
import Activate from "../screens/auth/activate";
import Reset from "../screens/auth/reset";

import Profile from "../screens/profile";

import SearchScreen from "../screens/people/search-screen";
import FriendsScreen from "../screens/people/friends-screen";
import RequestScreen from "../screens/people/requests-screen";
import Messenger from "../screens/messenger";
import Music from "../screens/music";
import Settings from "../screens/settings";

import Notification from "../common/notification";
import BgAnimation from "../common/bg-animation";
import MainLoader from "../common/spinners/main-loader";
import Page404 from "../common/page-404";

import ProtectedRoute from "../../hocs/protected-route";

import { RootState } from "../../redux/store";

const App: React.FC = () => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const isFetching = useSelector((state: RootState) => state.user.isFetching);

	const history = useHistory();

	useEffect(() => {
		if (!isAuthenticated) {
			dispatch(getUserRequest());
		}
	}, [dispatch, isAuthenticated]);

	useEffect(() => {
		if (!isFetching && !isAuthenticated) {
			history.push("/users/login");
		}
	}, [isFetching, isAuthenticated, history])

	if (isFetching) {
		return <MainLoader />;
	}

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

				<ProtectedRoute
					exact
					path="/people/friends"
					component={FriendsScreen}
				/>
				<ProtectedRoute
					exact
					path="/people/search"
					component={SearchScreen}
				/>
				<ProtectedRoute
					exact
					path="/people/requests"
					component={RequestScreen}
				/>

				<ProtectedRoute exact path="/messenger" component={Messenger} />
				<ProtectedRoute
					exact
					path="/messenger/:chatId"
					component={Messenger}
				/>
				<ProtectedRoute exact path="/music" component={Music} />
				<ProtectedRoute exact path="/:profileId" component={Profile} />

				<Route path="/users/login" component={Login} />
				<Route path="/users/register" component={Register} />
				<Route
					path="/users/activate/:activationToken"
					component={Activate}
				/>
				<Route path="/users/reset/:resetToken" component={Reset} />

				<Route path="/" component={Page404} />
			</Switch>
		</React.Fragment>
	);
};

export default App;
