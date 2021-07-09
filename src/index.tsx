// Dependencies
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

// History
import history from "./redux/common/history";

// Styles
import "./index.css";

// Components
import App from "./components/app";

// Store
import { store } from "./redux/store";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router history={history}>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
