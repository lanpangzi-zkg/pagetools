import axios from '../utils/axios';
export const getGamePageList = (params) => {
	return axios.get("https://it-console-tsc.suuyuu.cn/api/Game/getGamePageList", { params });
};
export const createGame = (params) => {
	const { data } = params;
	return axios.post("https://it-console-tsc.suuyuu.cn/api/Game/createGame", data);
};
export const editGame = (params) => {
	const { data } = params;
	return axios.post("https://it-console-tsc.suuyuu.cn/api/Game/editGame", data);
};
