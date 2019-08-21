import service from '../services/aaaa';
import { message } from 'antd';
const CODE_SUCCESS = '0';
export default {
	namespace: 'aaaa',
	state: {
		whiteList: [],
		whiteListTotal: 0,
		createWhiteList: {},
		editWhiteList: {},
	},
	effects: {
		*getWhiteListPageList(action, { call, put }) {
			const result = yield call(service.getWhiteListPageList, action.payload || {});
			if(result.code != CODE_SUCCESS) {
				result && message.error(result.message);
				yield put({
					type: REDUCER_TYPE,
					payload: {
						getWhiteListPageListLoading: false,
					},
				});
				return;
			}
			if (result && result.data) {
				yield put({
					type: 'updateState',
					payload: {
					whiteList: result.data &&  Array.isArray(result.data.list) ? result.data.list: [],
					whiteListTotal: result.data && result.data.total,
					getWhiteListPageListLoading: false,
				},
			});
		}
	},
	*createWhiteList(action, { call, put }) {
		const result = yield call(service.createWhiteList, action.payload || {});
		if(result.code != CODE_SUCCESS) {
			result && message.error(result.message);
			yield put({
				type: REDUCER_TYPE,
				payload: {
					createWhiteListLoading: false,
				},
			});
			return;
		}
		if (result && result.data) {
			yield put({
				type: 'updateState',
				payload: {
					createWhiteList: result.data,
					createWhiteListLoading: false,
				},
			});
		}
	},
	*editWhiteList(action, { call, put }) {
		const result = yield call(service.editWhiteList, action.payload || {});
		if(result.code != CODE_SUCCESS) {
			result && message.error(result.message);
			yield put({
				type: REDUCER_TYPE,
				payload: {
					editWhiteListLoading: false,
				},
			});
			return;
		}
		if (result && result.data) {
			yield put({
				type: 'updateState',
				payload: {
					editWhiteList: result.data,
					editWhiteListLoading: false,
				},
			});
		}
	},
},
reducers: {
	updateState(state, { payload }) {
		return {...state, ...payload };
	},
},
};
