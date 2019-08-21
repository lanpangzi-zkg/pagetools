const renderProp = (extraConfig) => {
    const {
        form,
        table,
        pageName,
    } =  extraConfig;
    const strArr = [];
    if (form) {
        strArr.push(`
            const { form } = this.props;
            const { getFieldDecorator } = form;
        `);
    }
    if (table) {
        const { modelKey, pagination } = table;
        strArr.push(`
            const { form } = this.props.${pageName};
        `);
        if (pagination) {
            strArr.push(`
                const { PageIndex, PageSize } = this.state;
                const { ${modelKey}Total, ${modelKey}List } = this.props.${pageName};
            `);
        }
    }
    return strArr.join('\n');
};

module.exports = renderProp;