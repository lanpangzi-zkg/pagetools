const renderItemComponent = (config) => {
    const { placeholder = '', type = 'Input' } = config;
    let itemComponent = null;
    switch(type) {
        case 'Select':
            itemComponent = renderSelect(config);
            break;
        case 'RangePicker':
            itemComponent = renderRangePicker(config);
            break;
        case 'DatePicker':
            itemComponent = renderDatePicker(config);
            break;
        case 'Radio':
            itemComponent = renderRadio(config);
            break;
        case 'Checkbox':
            itemComponent = renderCheckbox(config);
            break;
        default:
            itemComponent = `<Input placeholder="${placeholder}" />`;
            break;
    }
    return itemComponent; 
};

const renderSelect = (config) => {
    const { style = {}, options = [] } = config;
    const selectStyle = Object.assign({ width: '100%'}, style);
                            return `<Select style={${JSON.stringify(selectStyle)}}>
                                ${Array.isArray(options) ? options.map(({ key, optionValue, optionText }) => {
                                return `<Option
                                            key="${key || optionValue}"
                                            value="${optionValue}"
                                            style={${JSON.stringify(style)}}
                                        >
                                            ${optionText}
                                        </Option>`;
                                        }).join('') : null
                                }
                                    </Select>`;
};

const renderRadio = (config) => {
    const { style = {}, radios = [] } = config;
    return `<Radio.Group style={${JSON.stringify(style)}>
            ${
                Array.isArray(radios) ? radios.map(({ key, radioValue, radioText }) => {
                    return `(
                        <Radio
                            key="${key || radioValue}"
                            value="${radioValue}"
                            style={${JSON.stringify(style)}}
                        >
                            ${radioText}
                        </Radio>
                    )`;
                }) : null
            }
        </Radio.Group>`;
};
const renderCheckbox = (config) => {
    const { style = {}, cks = [] } = config;
    const ckStyle = Object.assign({ width: '100%'}, style);
    return `<Checkbox.Group style={${JSON.stringify(ckStyle)}}>
            ${
                Array.isArray(cks) ? cks.map(({ key, ckValue, ckText }) => {
                    return `(
                        <Checkbox
                            key="${key || ckValue}"
                            value="${ckValue}"
                            style={${JSON.stringify(style)}}
                        >
                            ${ckText}
                        </Checkbox>
                    )`;
                }) : null
            }
        </Checkbox.Group>`;
};
const renderDatePicker = (config) => {
                            return `<DatePicker style={{ width: '100%' }} />`;
};

const renderRangePicker = (config) => {
                            return `<RangePicker style={{ width: '100%' }} />`;
}

module.exports = renderItemComponent;