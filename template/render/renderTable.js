const getTableProps = (configs) => {
    const { modelKey = '[]', pagination, rowKey = '', rowSelection } = configs;
    const propsArr = [`dataSource={${modelKey}}`];
    if (pagination) {
        propsArr.push(`pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            total: ${modelKey}Total,
            current: PageIndex,
            pageSize: PageSize,
            onChange: this.onPageIndexChange,
            onShowSizeChange: this.onShowSizeChange,
        }}`);
    }
    if (rowKey) {
        propsArr.push(`rowKey="${rowKey}"`);
    }
    if (rowSelection) {
        propsArr.push(`rowSelection={{
            type: ${rowSelection.type},
            selectedRowKeys: this.state.selectedRowKeys,
            onChnage: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows,
                });
            }
        }}`);
    }
    return propsArr.join('\n');
};

const renderTable= (configs = {}) => {
    return `<Table
                columns={this.columns}
                ${getTableProps(configs)}
            />
    `;
};

module.exports = renderTable;