// const renderWidget = require('./renderWidget');

const renderHeaderCell = (config, cellNum = 1) => {
    const renderWidget = require('./renderWidget');
    return `<div className="cell-${cellNum}">
        ${renderWidget(config)}
    </div>`;
};

const renderHeader = (configs) => {
    return `<div className="fulu-header">
        ${Array.isArray(configs.cellsArr) ? configs.cellsArr.map((config) => {
            return renderHeaderCell(config, configs.cellsArr.length)
            }) : ''}
        </div>
    `;
};

module.exports = renderHeader;