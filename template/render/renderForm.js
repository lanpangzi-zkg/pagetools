const { getProps } = require('../function/propsUtil');
const renderButton = require('./renderButton');

const renderFormItem = (config) => {
    const { name, type, label } = config;
    const renderWidget = require('./renderWidget');
    if (type === "Button") {
        return `<FormItem>
            ${renderButton(config)}
        </FormItem>
        `;
    }
    if (!name) {
        return '';
    }
    return `<FormItem label="${label}">
            {getFieldDecorator("${name}"${getProps(config, 'FormItem')})(
                ${renderWidget(config)}
            )}
        </FormItem>
    `;
};

const renderForm = (configs) => {
    return `<Form onSubmit={this.onSubmit} layout="inline">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    ${Array.isArray(configs.formItemArr) && configs.formItemArr.map((config) => {
                        return `<Col md={colSpan} sm={24} key="col-${config.colIndex}">
                                ${renderFormItem(config)}
                    </Col>
                    `;
                    }).join('')}
                </Row>
        </Form>
    `;
};

module.exports = renderForm;