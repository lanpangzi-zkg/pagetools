const renderConstructor = (extraConfig, isModal) => {
    const {
        form,
        table,
    } =  extraConfig;
    const strArr = ['this.execFetchApi = this.execFetchApi.bind(this);'];
    const stateArr = ['this.state = {'];
    if (form) {
        strArr.push('this.onSubmit = this.onSubmit.bind(this);');
        strArr.push('this.onError = this.onError.bind(this);');
        strArr.push('this.onToggleLoading = this.onToggleLoading.bind(this);');
        stateArr.push('loading: false,');
    }
    if (table) {
        if (table.pagination) {
            stateArr.push(`
                PageIndex: 1,
                PageSize: 10,
            `);
        }
        if (table.rowSelection) {
            stateArr.push(`
                selectedRowKeys: [],
                selectedRows: [],
            `);
        }
    }
    stateArr.push('};');
    if (table) {
        strArr.push(`
            this.columns = this.onInitColumns(columns);
        `);
    }
    return stateArr.join('\n') + '\n' + strArr.join('\n');
};

module.exports = renderConstructor;