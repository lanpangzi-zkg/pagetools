const getInitialValue = require('./getInitialValue');

const getProps = (config, type) => {
    if (type === 'Button') {
        return getBtnProps(config);
    }
    if (type === 'Input') {
        return getInputProps(config);
    }
    if (type === 'FormItem') {
        return getFormItemOptions(config);
    }
    return getCompStyle(config);
};

const getCompStyle = (config) => {
    if (hasOwnProperty(config, 'style') && Object.keys(config.style || {}).length > 0) {
        return ` style={${JSON.stringify(config.style)}}`;
    }
    if (hasOwnProperty(config, 'boxStyles') && Object.keys(config.boxStyles || {}).length > 0) {
        return ` style={${JSON.stringify(config.boxStyles)}}`;
    }
    return '';
};

const getBtnProps = (btnConfig) => {
    const { btnIndex, htmlType, antdType, logicType } = btnConfig;
    const propsArr = [`key="btn-${btnIndex}"`];
    if (htmlType) {
        propsArr.push(`htmlType="${htmlType}"`);
    }
    if (antdType) {
        propsArr.push(`type="${antdType}"`);
    }
    if (propsArr.length > 0) {
        return ` ${propsArr.join(' ')}`;
    }
    return '';
};

const getInputProps = (inputConfig) => {
    const { placeholder } = inputConfig;
    if (placeholder) {
        return `placeholder="${placeholder}"`;
    }
    return '';
};

const getFormItemOptions = (config) => {
    const { required, initialValue, label, type } = config;
    const propsArr = [];
    if (required == 1) {
        const prefixLabel = type === 'Input' || type === 'TextArea' ? '请输入' : '请选择';
        propsArr.push(`rules: [{ required: true, message: "${prefixLabel}${label}" }],`);
    }
    if (hasOwnProperty(config, 'initialValue')) {
        propsArr.push(`initialValue: ${getInitialValue(config)},`);
    }
    if (propsArr.length > 0) {
        propsArr.unshift(`, {`);
        propsArr.push('}');
    }
    return  propsArr.join('\n');
};

const hasOwnProperty = (obj, property) => {
    return Object.hasOwnProperty.call(obj || {}, property);
};

module.exports = {
    getProps,
    hasOwnProperty,
};