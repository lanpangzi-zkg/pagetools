const renderTable= (configs) => {
    const { columns, modelKey, hasOperation, operationArr, rowKey = '', rowSelection } = configs || {};
    return `<Table
                columns={this.columns}
                dataSource={[]}
                rowKey="${rowKey}"
                rowSelection={${JSON.stringify(rowSelection)}}
            />
    `;
};

module.exports = renderTable;