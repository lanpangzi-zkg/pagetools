import * as service from '../services/aaaa';
import { message } from 'antd';
const CODE_SUCCESS = '0';
export default {
	namespace: 'aaaa',
	state: {
	gamePageList: [],
	gamePageListTotal: 0,
},
effects: {
	*getGamePageList(action, { call, put }) {
		const result = yield call(service.getGamePageList, action.payload || {});
		if(result.code != CODE_SUCCESS) {
			result && message.error(result.message);
		} else {
			yield put({
				type: 'updateState',
				payload: {
				gamePageList: result.data &&  Array.isArray(result.data.list) ? result.data.list: [],
				gamePageListTotal: result.data && result.data.total,
			},
		});
	}
	return result;
},
},
reducers: {
	updateState(state, { payload }) {
		return {...state, ...payload };
	},
},
};
