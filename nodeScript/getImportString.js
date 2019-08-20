const getImportString = (layoutConfig = [], initImports = []) => {
    const antdImportSets = conbine(getAntdImportString(layoutConfig), new Set(initImports));
    const otherImportSets = getOtherImportString(antdImportSets);
    return antdImportSets.size > 0 ? "import { " + Array.from(antdImportSets).join(', ') + " }" + `from antd;\n${otherImportSets.join('\n')}` : '';
};

function conbine(setA, setB) {
    for (let elem of setB) {
        setA.add(elem);
    }
    return setA;
}

const getAntdImportString = (layoutConfig = []) => {
    const antdImportSets = new Set();
    layoutConfig.forEach((item) => {
        if (item.type === 'FormContainer') {
            antdImportSets.add('Form');
            const { formItemArr = [] } = item;
            formItemArr.forEach((formItem) => {
                formItem.type && antdImportSets.add(formItem.type);
            });
        } else if (item.type === 'TableContainer') {
            antdImportSets.add('Table');
        } else if (item.type === 'LineContainer') {
            antdImportSets.add('Divider');
        } else {
            if (Object.keys(item.configs || {}).length > 0 && Array.isArray(item.configs.cellsArr)) {
                conbine(antdImportSets, getAntdImportString(item.configs.cellsArr));
            }
        }
    });
    return antdImportSets;
};

const getOtherImportString = (antdImportSets) => {
    const antherImports = [];
    if (antdImportSets.has('RangePicker') || antdImportSets.has('DatePicker')) {
        antherImports.push("import moment from 'monent';");
        antdImportSets.delete('RangePicker');
    }
    if (antdImportSets.has('RangePicker')) {
        antherImports.push('const { RangePicker } = DatePicker;');
    }    
    if (antdImportSets.has('TextArea')) {
        antherImports.push('const { TextArea } = Input;');
        antdImportSets.delete('TextArea');
    }
    if (antdImportSets.has('Select')) {
        antherImports.push('const { Option } = Select;');
    }
    if (antdImportSets.has('Form')) {
        antherImports.push('const FormItem = Form.Item;');
    }
    return antherImports;
};

module.exports = getImportString;