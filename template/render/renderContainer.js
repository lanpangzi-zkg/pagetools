const renderForm = require('./renderForm');
const renderBox = require('./renderBox');
const renderModal = require('./renderModal');
const renderHeader = require('./renderHeader');
const renderTable = require('./renderTable');

const renderContainer = (renderConfig) => {
    const { type, configs } = renderConfig;
    let component = null;
    if (!Object.hasOwnProperty.call(renderConfig, 'type')) {
        return component;
    }
    switch(type) {
        case 'FormContainer':
            component = renderForm(configs);
            break;
        case 'LineContainer':
            component = renderLine();
            break;
        case 'TableContainer':
            component = renderTable(configs);
            break;
        case 'BoxContainer':
            component = renderBox(configs);
            break;
        case 'ModalContainer':
            component = renderModal(configs);
            break;
        case 'HeaderContainer':
            component = renderHeader(configs);
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