const { getProps } = require('../function/propsUtil');
const renderButton = require('./renderButton');

const renderFormItem = (formItemConfig) => {
    const { type, configs = {} } = formItemConfig;
    const renderWidget = require('./renderWidget');
    if (type === "Button") {
        return `<FormItem>
            ${renderButton(configs)}
        </FormItem>
        `;
    }
    const { name, label } = configs;
    if (!name) {
        return '';
    }
    return `<FormItem label="${label}">
            {getFieldDecorator("${name}"${getProps(configs, 'FormItem')})(
                ${renderWidget(formItemConfig)}
            )}
        </FormItem>
    `;
};

const renderForm = (configs) => {
    return `<Form onSubmit={this.onSubmit} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    ${Array.isArray(configs.formItemArr) && configs.formItemArr.map((formItemConfig) => {
                        return `<Col md={colSpan} sm={24} key="col-${formItemConfig.colIndex}">
                                ${renderFormItem(formItemConfig)}
                    </Col>
                    `;
                    }).join('')}
                </Row>
        </Form>
    `;
};

module.exports = renderForm;