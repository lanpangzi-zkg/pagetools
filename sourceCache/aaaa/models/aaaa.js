import service from '../services/aaaa';
import { message } from 'antd';
const CODE_SUCCESS = '0';
export default {
	namespace: 'aaaa',
	state: {
	},
	effects: {
	},
	reducers: {
		updateState(state, { payload }) {
			return {...state, ...payload };
		},
	},
};
