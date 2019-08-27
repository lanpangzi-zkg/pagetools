const renderForm = require('./renderForm');
const renderBox = require('./renderBox');
const renderModal = require('./renderModal');
const renderHeader = require('./renderHeader');
const renderTable = require('./renderTable');

const renderContainer = (renderConfig, pageName) => {
    const { type } = renderConfig;
    let component = null;
    if (!Object.hasOwnProperty.call(renderConfig, 'type')) {
        return component;
    }
    switch(type) {
        case 'FormContainer':
            component = renderForm(renderConfig);
            break;
        case 'LineContainer':
            component = renderLine();
            break;
        case 'TableContainer':
            component = renderTable(renderConfig, pageName);
            break;
        case 'BoxContainer':
            component = renderBox(renderConfig);
            break;
        case 'ModalContainer':
            component = renderModal(renderConfig);
            break;
        case 'HeaderContainer':
            component = renderHeader(renderConfig);
            break;
        default:
            break;
    }
    return component;
};

const renderLine = () => {
    return '<Divider />';
};

module.exports = renderContainer;