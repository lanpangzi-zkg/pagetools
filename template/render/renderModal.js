const renderModal = (configs = {}) => {
    const { layoutConfig = [], title, width } = configs;
    const renderEnter = require('./renderEnter');
    return `<Modal
                closable={false}
                maskClosable={false}
                centered
                onCancel={this.onCancel}
                onOk={this.onOk}
                afterClose={this.onResetModal}
                title="${title}"
                width="${width}"
            >
                <Spin spinning={this.state.loading}>
                    ${renderEnter({ layoutConfig })}
                </Spin>
            </Modal>
    `;
};

module.exports = renderModal;