const getTableProps = (configs) => {
    const { modelKey, pagination, rowKey = '', rowSelection } = configs;
    const propsArr = [`dataSource={${modelKey}}`];
    if (pagination) {
        propsArr.push(`pagination={{
            showQuickJumper,
            showSizeChanger,
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
        propsArr.push(`rowSelection={${JSON.stringify(rowSelection)}}`);
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