const { getProps } = require('../function/propsUtil');
const renderButton = require('./renderButton');
const renderContainer = require('./renderContainer');

const renderWidget = (renderConfig) => {
    const { type } = renderConfig;
    let component = '';
    if (!Object.hasOwnProperty.call(renderConfig, 'type')) {
        return component;
    }
    switch(type) {
        case 'Text':
            component = renderText(renderConfig);
            break;
        case 'Breadcrumb':
            component = renderBreadcrumb(renderConfig);
            break;
        case 'Select':
            component = renderSelect(renderConfig);
            break;
        case 'RangePicker':
            component = renderRangePicker(renderConfig);
            break;
        case 'DatePicker':
            component = renderDatePicker(renderConfig);
            break;
        case 'Radio':
            component = renderRadio(renderConfig);
            break;
        case 'Checkbox':
            component = renderCheckbox(renderConfig);
            break;
        case 'Tabs':
            component = renderTabs(renderConfig);
            break;
        case 'Input':
            component = renderInput(renderConfig);
            break;
        case 'TextArea':
            component = renderTextArea(renderConfig);
            break;
        case 'Button':
            component = renderButton(renderConfig);
            break;
        case 'FormContainer':
        case 'ModalContainer':
        case 'LineContainer':
        case 'TableContainer':
        case 'BoxContainer':
        case 'HeaderContainer':
            component = renderContainer(renderConfig);
            break;
        default:
            break;
    }
    return component;
};

const renderInput = (config) => {
    return `<Input ${getProps(config, 'Input')}/>`;
};

const renderTextArea = (config) => {
    const { colIndex, dropIndex, originSpan, cellStyles, hasLinkage,  ...rest } = config;
    return `<TextArea ${getProps(config, 'TextArea')} />`;
};

const renderText = (config) => {
    const { text, style } = config;
    return `<span style={${JSON.stringify(style)}}>${text}</span>`;
};
const renderBreadcrumb = (config) => {
    const { breadcrumbArr = []} = config;
    return `<Breadcrumb${getProps(config)}>
        ${breadcrumbArr.map(({ label, value }, i) => {
        return `
            <Breadcrumb.Item key="breadcrumb-${i}">
                ${ value ? `<a href="${value}">${label}</a>` : `<span>${label}</span>`}
            </Breadcrumb.Item>
        `
        }).join('')}
    </Breadcrumb>`;
};
const renderSelect = (config) => {
    const { style = {}, selectArr = [] } = config;
    const selectStyle = Object.assign({ width: '100%'}, style);
    return `<Select style={${JSON.stringify(selectStyle)}}>
        ${Array.isArray(selectArr) ? selectArr.map(({ key, label, value }) => {
            return `
                <Option key="${key || value}" value="${value}">
                    ${label}
                </Option>
            `;
            }).join('') : ''}
    </Select>`;
};

const renderTabs = (config) => {
    const { style = {}, tabsArr = [] } = config;
    return `<Tabs style={${JSON.stringify(style)}}>
        ${Array.isArray(tabsArr) ? tabsArr.map(({ key, label, value }) => {
            return `<TabPane key="${key || value}"} tab="${label}">
            </TabPane>
            `;
        }).join('') : null
    }
    </Tabs>`;
};

const renderRadio = (config) => {
    const { style = {}, radioArr = [] } = config;
    return `<Radio.Group style={${JSON.stringify(style)}>
        ${Array.isArray(radioArr) ? radioArr.map(({ key, label, value }) => {
            return `<Radio key="${key || value}" value="${value}">
                ${label}
            </Radio>
            `;
        }).join('') : null
        }
    </Radio.Group>`;
};
const renderCheckbox = (config) => {
    const { style = {}, checkboxArr = [] } = config;
    const ckStyle = Object.assign({ width: '100%'}, style);
    const optionsStr = JSON.stringify(checkboxArr);
    return `<CheckboxGroup options={${optionsStr}} style={${JSON.stringify(ckStyle)} />`;
};
const renderDatePicker = (config) => {
    const { showTime = false, format } = config;
    return `<DatePicker style={{ width: '100%' }}  showTime={${showTime}} format="${format}" />`;
};

const renderRangePicker = (config) => {
    const { showTime = false, format } = config;
    return `<RangePicker style={{ width: '100%' }} showTime={${showTime}} format="${format}" />`;
}

module.exports = renderWidget;