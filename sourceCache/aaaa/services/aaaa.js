import axios from '../utils/axios';
export const getGamePageList = (params) => {
	return axios.get(window.configs.host.webapi + "/api/Game/getGamePageList", { params });
};
