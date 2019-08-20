const renderWidget = require('./renderWidget');
const renderModal = require('./renderModal');

const renderEnter = (fileConfig) => {
    const { layoutConfig = [], fileType } = fileConfig;
    if (fileType === 'modal') { // 渲染弹窗
        return renderModal(fileConfig);
    }
    return layoutConfig.map((config) => {
        return renderWidget(config);
    }).join('');
};

module.exports = renderEnter;