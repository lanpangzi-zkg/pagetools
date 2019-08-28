import axios from '../utils/axios';
export const getGamePageList = (params) => {
	return axios.get("https://it-console-tsc.suuyuu.cn/api/Game/getGamePageList", { params });
};
export const createGame = (params) => {
	return axios.post("https://it-console-tsc.suuyuu.cn/api/Game/createGame", params);
};
export const editGame = (params) => {
	return axios.post("https://it-console-tsc.suuyuu.cn/api/Game/editGame", params);
};
