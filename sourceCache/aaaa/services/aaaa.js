import axios from '../utils/axios';
const getWhiteListPageList = (params) => {
	return axios.get("https://it-console-tsc.suuyuu.cn/api/WhiteList/getWhiteListPageList", { params });
};
const createWhiteList = (params) => {
	const { data } = params;
	return axios.post("https://it-console-tsc.suuyuu.cn/api/WhiteList/createWhiteList", data);
};
const editWhiteList = (params) => {
	const { data } = params;
	return axios.post("https://it-console-tsc.suuyuu.cn/api/WhiteList/editWhiteList", data);
};
