import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:3000/"
});

export const fetchData = async url => {
	const response = instance.get(url);
	const data = (await response).data;
	return data;
};

export default {
	fetchData
};
