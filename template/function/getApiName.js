const getApiName = (requestApi) => {
    return requestApi && requestApi.slice(requestApi.lastIndexOf('/') + 1);
};

module.exports = getApiName;