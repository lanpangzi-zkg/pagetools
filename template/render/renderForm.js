const { getProps } = require('../function/propsUtil');
const renderButton = require('./renderButton');

const renderFormItem = (formItemConfig) => {
    const { type } = formItemConfig;
    const renderWidget = require('./renderWidget');
    if (type === "Button") {
        return `<FormItem>
            ${renderButton(formItemConfig)}
        </FormItem>
        `;
    }
    const { name, label } = formItemConfig;
    if (!name) {
        return '';
    }
    return `<FormItem label="${label}">
            {getFieldDecorator("${name}"${getProps(formItemConfig, 'FormItem')})(
                ${renderWidget(formItemConfig)}
            )}
        </FormItem>
    `;
};

const renderForm = (configs) => {
    return `<Form onSubmit={this.onSubmit} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    ${Array.isArray(configs.formItemArr) && configs.formItemArr.map((formItemConfig) => {
                        return `<Col md={${formItemConfig.colSpan || 8}} sm={24}>
                                ${renderFormItem(formItemConfig)}
                    </Col>
                    `;
                    }).join('')}
                </Row>
        </Form>
    `;
};

module.exports = renderForm;