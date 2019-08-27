const renderModalInPage = ({ name }) => {
    return `
        <${name}
            {...this.props}
            editData={this.state.editData}
            initApi={this.state.init${name}Api}
            visible={this.state.show${name}}
            onCancel={this.onHiddenModal}
        />
    `;
};

module.exports = renderModalInPage;