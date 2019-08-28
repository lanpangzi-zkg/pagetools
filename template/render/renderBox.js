const { getProps } = require('../function/propsUtil');
// const renderWidget = require('./renderWidget');

const renderBoxCell = (config, layoutColumn) => {
    const renderWidget = require('./renderWidget');
    return `<div className="cell cell-${layoutColumn}">
                ${renderWidget(config)}
            </div>
    `;
};

const renderBox = (configs) => {
    const { layoutColumn = 1 } = configs;
    return `<div class="fulu-box"${getProps(configs)}>
                ${Array.isArray(configs.cellsArr) ? configs.cellsArr.map((config) => renderBoxCell(config, layoutColumn)).join('') : ''} 
            </div>`;
};

module.exports = renderBox;