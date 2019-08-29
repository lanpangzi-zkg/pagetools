const getDispatchStr =(form, fileConfig, pageName) => {
    const getApiName = require('../function/getApiName');
    const { formType, queryApi = '', addApi, editApi } = form;
    if (formType === 'query') {
        const formConfigs = getFormConfigsByType(fileConfig);
        return queryApi ? `${getSubmitValues(formConfigs, fileConfig)}
        this.onToggleLoading();
        dispatch({
            type: '${pageName}/${getApiName(queryApi)}',
            payload: values,
        }).then(() => {
            this.onToggleLoading();
        }).catch(this.onError);` : '// add code here';
    } else {
        const formConfigs = getFormConfigsByType(fileConfig, 'save');
        return `
            const { mode = 'add' } = this.props;
            const disptachType = mode === 'add' ? '${pageName}/${getApiName(addApi)}' : '${pageName}/${getApiName(editApi)}';
            ${getSubmitValues(formConfigs, fileConfig)}
            this.onToggleLoading();
            dispatch({
            type: disptachType,
            payload: values,
        }).then((res) => {
            this.onToggleLoading();
            const { code } = res;
            if (code === '0') {
                message.success('保存成功');
                ${fileConfig.fileType === 'modal' ? 'this.onCancel(true);' : ''}
            }
        }).catch(this.onError);
        `;
    }
};

const getSubmitValues = (formConfigs, fileConfig = {}) => {
    const { formItemArr = [], editApi } = formConfigs || {};
    const dateKeys = [];
    let dateStr = '';
    formItemArr.forEach((item) => {
        const { type } = item;
        if (type === 'DatePicker' || type === 'RangePicker') {
            dateKeys.push(item);
        }
    });
    if (dateKeys.length > 0) {
        dateStr = dateKeys.reduce((arr, { name, format }) => {
            arr.push(`values.${name} = values.${name} && values.${name}.format('${format}');`);
            return arr;
        }, []).join('\n');
    }
    let editParams = '';
    if (editApi) {
        const { layerConfig = {} } = fileConfig;
        const { apiArr = [] } = layerConfig;
        const apiObj = apiArr.find(({ requestApi }) => {
            return editApi === requestApi;
        });
        if (apiObj) {
            const { requestParams } = apiObj;
            editParams = requestParams.split(',').reduce((arr, pid) => {
                arr.push(`values.${pid} = editData.${pid};`);
                return arr;
            }, ["if (mode === 'edit') {\n"]).join('\n') + '\n}';
        }
    }
    return dateStr + '\n' + editParams;
};

const getFormConfigsByType = (fileConfig, pType ='query') => {
    const { layoutConfig = [] } = fileConfig;
    const formConfigs = layoutConfig.find(({ type, formType }) => {
        return type === 'FormContainer' && formType === pType;
    });
    return formConfigs;
};

const renderOpItem = (itemConfigs) => {
    const getApiName = require('../function/getApiName');
    const { opText, opType, modalData, modalName, api } = itemConfigs;
    let str = '';
    if (opType === 'edit' || opType === 'view') {
        str =  modalData === 'table' ? `this.setState({ editData: record, ${modalName}Mode: '${opType}' });` :
            `this.setState({ editData: record, init${modalName}Api: '${getApiName(api)}', ${modalName}Mode: '${opType}' });`;
        return `<a onClick={() => {
            ${str}
            this.onShowModal('${modalName}');
        }}>${opText}</a>`;
    }
    return `<a href="javascript:void(0);">${opText}</a>`;
};

const renderOperation = (operationArr) => {
    return `_columns[columns.length - 1].render = (text, record) => {
        return (
            <Fragment>
            ${
                operationArr.map((itemConfigs) => {
                    return renderOpItem(itemConfigs);
                }).join('\n<Divider type="vertical" />\n')
            }
        </Fragment>
        );
    };`;
};

const renderMethod = (extraConfig, fileConfig, pName) => {
    const {
        form,
        table,
        pageName,
        modalArr,
    } =  extraConfig;
    const methodStrArr= [
        `onError(e) {
            this.onToggleLoading();
        }
        onToggleLoading() {
            this.setState({
                loading: !this.state.loading,
            });
        }
        execFetchApi(api, params) {
            const { dispatch } = this.props;
            this.onToggleLoading();
            dispatch({
                type: \`${pName || pageName}/\${api}\`,
                payload: params,
            }).then(() => {
                this.onToggleLoading();
            }).catch(this.onError);
        }
        `
    ];
    if (form) {
        methodStrArr.push(`
            onSubmit(e) {
                e && e.preventDefault();
                ${ fileConfig.fileType === 'modal' ? 'const { form, dispatch, editData } = this.props;' : 'const { form, dispatch } = this.props;' }
                form.validateFields((err, values) => {
                    if (!err) {
                       ${getDispatchStr(form, fileConfig, pName || pageName)}
                    }
                });
            }
        `);
    }
    if (modalArr) {
        methodStrArr.push(`
            onHiddenModal = (modalName, updateList) => {
                this.setState({
                    [\`show\${modalName\}\`]: false,
                });
                if (updateList && typeof this.onSubmit === 'function') {
                    this.onSubmit();
                }
            }
        `);
        methodStrArr.push(`
            onShowModal = (modalName) => {
                this.setState({
                    [\`show\${modalName\}\`]: true,
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
                PageIndex: current,
                PageSize: size,
            });
        }
        `);
    }
    return methodStrArr.join('\n');
};

module.exports = renderMethod;