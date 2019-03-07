const renderButton = (config) => {
    const { btnArr } = config;
                            return `<Fragment>
                                    ${btnArr.map((btn) => {
                                        const { btnText = 'button', type, index, props, style = {}, expandFlag = '0' } = btn;
                                        if (expandFlag === '1') {
                                            return getExpandBtn(btn);
                                        } else {
                                return `<Button
                                        key="btn-${index}"
                                        type="${type}"
                                        style={${JSON.stringify(style)}}
                                    >
                                        ${btnText}
                                    </Button>
                                    `;
                                            }
                                        }).join('')
                                    }
                                </Fragment>`;
};

const getExpandBtn = (btnConfig) => {
    const { index, props, style = {} } = btnConfig;
                                return `<a
                                        className="btn-collapse"
                                        onClick="{this.onCollapse}"
                                        href="javascript:void(0);"
                                        style={${JSON.stringify(style)}}
                                        key="btn-${index}"
                                    >
                                        {this.state.expand ? '隐藏' : '展开' }
                                        <Icon type={this.state.expand ? 'up' : 'down'} />
                                    </a>
                                `;
}

module.exports = renderButton;