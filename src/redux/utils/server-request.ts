// Dependenices
import axios from "axios";

// Server url
const _url: string = process.env.NODE_ENV === "development"
	? "http://localhost:4000" 
	: "https://rainbow-server-api.herokuapp.com";

export const AxiosGetRequest = async (url: string) => {
	try {
		const data = await axios.get(`${_url}${url}`, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		if (error.response.status === 401) {
			try {
				await axios.get(`${_url}/authentication/refresh`, {
					withCredentials: true,
				});
				const data = await axios.get(`${_url}${url}`, {
					withCredentials: true,
				});
				return data;
			} catch (error) {
				throw error;
			}
		}
		throw error;
	}
};

export const AxiosPostRequest = async (url: string, payload: any) => {
	try {
		const data = await axios.post(`${_url}${url}`, payload, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		if (error.response.status === 401) {
			try {
				await axios.get(`${_url}/authentication/refresh`, {
					withCredentials: true,
				});
				const data = await axios.post(`${_url}${url}`, payload, {
					withCredentials: true,
				});
				return data;
			} catch (error) {
				throw error;
			}
		}
		throw error;
	}
};
