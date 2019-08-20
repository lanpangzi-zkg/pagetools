	import service from '../services/aaaa';
	import { message } from 'antd';
	const CODE_SUCCESS = '0';
	export default {
		namespace: 'aaaa',
		state: {
			whiteList,
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
							...res.data,
							getWhiteListPageListLoading: false,
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
