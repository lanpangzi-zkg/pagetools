const getApiName = require('../function/getApiName');

const concatReqUrl = (requestHost, requestApi) => {
    return `"${requestHost}${requestApi}"`;
};

const renderService = ({ layerConfig }) => {
    const { apiArr = [] } = layerConfig;
    return apiArr.map(({ requestHost, requestMethod, requestApi }) => {
        if (requestMethod === 'GET') {
            return `const ${getApiName(requestApi)} = (params) => {
                return axios.get(${concatReqUrl(requestHost, requestApi)}, { params });
            };`;
        } else {
            return `const ${getApiName(requestApi)} = (params) => {
                const { data } = params;
                return axios.post(${concatReqUrl(requestHost, requestApi)}, data);
            };`;
        }
    }).join('\n');
};

module.exports = renderService;