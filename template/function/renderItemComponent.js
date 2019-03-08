const renderItemComponent = (dropConfig) => {
    const { placeholder = '', type = 'Input' } = dropConfig;
    let component = null;
    if (!Object.hasOwnProperty.call(dropConfig, 'type')) {
        return component;
    }
    switch(type) {
        case 'Text':
            component = renderText(dropConfig);
            break;
        case 'Breadcrumb':
            component = renderBreadcrumb(dropConfig);
            break;
        case 'Select':
            component = renderSelect(dropConfig);
            break;
        case 'RangePicker':
            component = renderRangePicker(dropConfig);
            break;
        case 'DatePicker':
            component = renderDatePicker(dropConfig);
            break;
        case 'Radio':
            component = renderRadio(dropConfig);
            break;
        case 'Checkbox':
            component = renderCheckbox(dropConfig);
            break;
        case 'Tabs':
            component = renderTabs(dropConfig);
            break;
        case 'Btn':
            component = renderBtn(dropConfig);
            break;
        default:
            component = `<Input placeholder="${placeholder}" />`;
            break;
    }
    return component;
};
const renderText = (config) => {
    const { text, style } = config;
                            return `<span style={${JSON.stringify(style)}}>${text}</span>`;
};
const renderBtn = (config) => {
    const { btnArr } = config;
                            return `<Fragment>
                                    ${
                                        btnArr.map((btn) => {
                                            const { btnText = 'button', expandFlag, expandCount,
                                                style = {}, index } = btn;
                                            const k = `btn-${index}`;
                                            return `<Button
                                                    key="${k}"
                                                    style={${JSON.stringify(style)}}
                                                >
                                                    ${btnText}
                                                </Button>
                                            `;
                                        })
                                    }
                                </Fragment>`;
}
const renderBreadcrumb = (config) => {
    const { breadcrumbArr = [], style = {} } = config;
                            return `<Breadcrumb style={${JSON.stringify(style)}}>
                                    ${
                                        breadcrumbArr.map(({ label, value }, i) => {
                                        const k = `breadcrumb-${i}`;
                                return `<Breadcrumb.Item key="${k}">
                                            ${ value ? 
                                            `<a href="${value}">${label}</a>` :
                                            `<span>${label}</span>`
                                            }
                                    </Breadcrumb.Item>
                                            `;
                                        }).join('')
                                }
                        </Breadcrumb>`;
};
const renderSelect = (config) => {
    const { style = {}, selectArr = [] } = config;
    const selectStyle = Object.assign({ width: '100%'}, style);
                            return `<Select style={${JSON.stringify(selectStyle)}}>
                                    ${
                                        Array.isArray(selectArr) ? selectArr.map(({ key, label, value }) => {
                                        return `    <Option
                                            key="${key || value}"
                                            value="${value}"
                                        >
                                            ${label}
                                        </Option>
                                        `;
                                        }).join('') : null
                                }
                                    </Select>`;
};

const renderTabs = (config) => {
    const { style = {}, tabsArr = [] } = config;
                            return `<Tabs style={${JSON.stringify(style)}}>
                                        ${Array.isArray(tabsArr) ? tabsArr.map(({ key, label, value }) => {
                                            return `    <TabPane
                                                key="${key || value}"}
                                                tab="${label}"
                                            >
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
                                        return `    <Radio
                                            key="${key || value}"
                                            value="${value}"
                                        >
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

module.exports = renderItemComponent;