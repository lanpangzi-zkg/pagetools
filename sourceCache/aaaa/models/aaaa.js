import * as service from '../services/aaaa';
import { message } from 'antd';
const CODE_SUCCESS = '0';
export default {
	namespace: 'aaaa',
	state: {
		gamePageList: [],
		gamePageListTotal: 0,
		createGame: {},
		editGame: {},
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
		*createGame(action, { call, put }) {
			const result = yield call(service.createGame, action.payload || {});
			if(result.code != CODE_SUCCESS) {
				result && message.error(result.message);
			} else {
				yield put({
					type: 'updateState',
					payload: {
						createGame: result.data,
					},
				});
			}
			return result;
		},
		*editGame(action, { call, put }) {
			const result = yield call(service.editGame, action.payload || {});
			if(result.code != CODE_SUCCESS) {
				result && message.error(result.message);
			} else {
				yield put({
					type: 'updateState',
					payload: {
						editGame: result.data,
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
