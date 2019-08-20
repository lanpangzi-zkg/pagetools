import axios from '../utils/axios';
const getWhiteListPageList = (params) => {
	return axios.get("https://it-console-tsc.suuyuu.cn/api/WhiteList/getWhiteListPageList", { params });
