const getDispatchStr =(form, pageName) => {
    const getApiName = require('../function/getApiName');
    const { formType, queryApi, addApi, editApi } = form;
    if (formType === 'query' && queryApi) {
        return `dispatch({
            type: '${pageName}/${getApiName(queryApi)}',
            payload: values,
        });`;
    } else {
        return `
            const { mode = 'add' } = this.props;
            const disptachType = mode === 'add' ? '${pageName}/${getApiName(addApi)}' : '${pageName}/${getApiName(editApi)}';
            dispatch({
            type: disptachType,
            payload: values,
        });
        `;
    }
};

const renderOperation = (operationArr) => {
    return `_columns[columns.length - 1].render = (text, record) => {
        return (
            ${
                operationArr.map(({ opText, opType, modalData, modalName }) => {
                    return `<a onClick={() => {
                        ${ opType === 'edit' && modalData === 'table' ? 'this.setState({ editData: record });' : '' }
                        this.showModal('${modalName}');
                    }}>${opText}</a>`;
                }).join('Divider type="vertical" />')
            }
        );
    };`;
};

const renderMethod = (extraConfig, pName) => {
    const {
        form,
        table,
        pageName,
        modalArr,
    } =  extraConfig;
    const methodStrArr= [];
    if (form) {
        methodStrArr.push(`
            onSubmit(e) {
                e.preventDefault();
                const { form, dispatch } = this.props;
                form.validateFields((err, values) => {
                    if (!err) {
                       ${getDispatchStr(form, pName || pageName)}
                    }
                });
            }
        `);
    }
    if (modalArr) {
        methodStrArr.push(`
            onSubmitModal = (modalName, modelType, payload) => {
                this.props.dispatch({
                    type: \`${pageName}/\${modelType\}\`,
                    payload,
                }).then((result) => {
                    if (result && result.data && result.data.code == '0') {
                        this.onToggleModal(modalName);
                    }
                });
            }
        `);
        methodStrArr.push(`
            onToggleModal = (modalName) => {
                this.setState({
                    [\`show\${modalName\}\`]: false,
                });
            }
        `);
    }
    if (table) {
        const { hasOperation, operationArr = [] } = table;
        methodStrArr.push(`
        onInitColumns = (columns) => {
            const _columns = columns;
            ${
                hasOperation === '1' && operationArr.length > 0 ? renderOperation(operationArr) : ''
            }
            return _columns;
        }
        `);
    }
    if (table && table.pagination) {
        methodStrArr.push(`
        onPageIndexChange = (page, pageSize) => {
            this.setState({
                PageIndex: page,
                PageSize: pageSize,
            })
        }
        onShowSizeChange = (current, size) => {
            this.setState({
                ageIndex: current,
                PageSize: size,
            });
        }`);
    }
    return methodStrArr.join('\n');
};

module.exports = renderMethod;