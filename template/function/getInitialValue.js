function getInitialValue(config) {
    const { type = 'Input', defaultValue, dateFormat = 'YYYY-MM-DD' } = config;
    if (type === 'DatePicker' || type === 'RangePicker') {
        if (defaultValue) {
            return `moment('${defaultValue}', '${dateFormat}')`;
        }
        return "''";
    }
    return `'${config.defaultValue || ''}'`;
}
module.exports = getInitialValue;