const renderConstructor = (extraConfig) => {
    const {
        form,
        table,
        pageName,
    } =  extraConfig;
    const strArr = [];
    if (form) {
        strArr.push(`this.onSubmit = this.onSubmit.bind(this);`);
    }
    if (table && table.pagination) {
        strArr.push(`
        this.state = {
            PageIndex: 1,
            PageSize: 10,
        };
        `);
    }
    if (table) {
        strArr.push(`
            this.columns = this.onInitColumns(columns);
        `);
    }
    return strArr.join('\n');
};

module.exports = renderConstructor;