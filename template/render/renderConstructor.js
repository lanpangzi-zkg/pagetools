const renderConstructor = (extraConfig, isModal) => {
    const {
        form,
        table,
    } =  extraConfig;
    const strArr = [];
    const stateArr = ['this.state = {'];
    if (form) {
        strArr.push(`this.onSubmit = this.onSubmit.bind(this);`);
        if (isModal) {
            stateArr.push('loading: false,');
        }
    }
    if (table && table.pagination) {
        stateArr.push(`
            PageIndex: 1,
            PageSize: 10,
        `);
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