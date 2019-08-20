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
                ${renderEnter({ layoutConfig })}
            </Modal>
    `;
};

module.exports = renderModal;