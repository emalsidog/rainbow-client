import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export const forwardTo = (location) => {
	history.push(location);
};

export default history;
