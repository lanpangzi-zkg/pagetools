const renderModalInPage = ({ name }) => {
    return `
        <${name}
            {...this.props}
            visible={this.state.show${name}}
            onCancel={this.onToggleModal}
            onOk={this.onSubmitModal}
        />
    `;
};

module.exports = renderModalInPage;