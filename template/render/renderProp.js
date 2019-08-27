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
        const { modelKey = '', pagination } = table;
        if (pagination) {
            strArr.push(`
                const { PageIndex, PageSize } = this.state;
                const { ${modelKey}Total, ${modelKey} } = this.props.${pageName};
            `);
        } else {
            strArr.push(`
            const { ${modelKey} } = this.props.${pageName};
        `);
        }
    }
    return strArr.join('\n');
};

module.exports = renderProp;