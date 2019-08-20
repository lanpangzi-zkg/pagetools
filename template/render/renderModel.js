const getApiName = require('../function/getApiName');

const renderEffect = (requestApi) => {
    const apiName = getApiName(requestApi);
    return `
        *${apiName}(action, { call, put }) {
            const result = yield call(service.${apiName}, action.payload || {});
            if(result.code != CODE_SUCCESS) {
                result && message.error(result.message);
                yield put({
                    type: REDUCER_TYPE,
                    payload: {
                        ${apiName}Loading: false,
                    },
                });
                return;
            }
            if (result && result.data) {
                yield put({
                    type: 'updateState',
                    payload: {
                        ...res.data,
                        ${apiName}Loading: false,
                    },
                });
            }
        },
    `;
};

const renderModel = ({ layerConfig }) => {
    const { apiArr = [] } = layerConfig;
    const { state, effects } = apiArr.reduce((obj, { modelKey, requestApi, requestPagination }) => {
        obj.state.push(`${modelKey},`);
        obj.effects.push(renderEffect(requestApi, requestPagination));
        return obj;
    }, { state: [], effects: [] });
    return `
        state: {
            ${state.join('\n')}
        },
        effects: {
            ${effects.join('\n')}
        },
    `;
};

module.exports = renderModel;