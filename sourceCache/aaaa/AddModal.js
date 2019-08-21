import React, { Component } from 'react';
import { Form, Modal } from 'antd';
const FormItem = Form.Item;
class AddModal extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.onOk = this.onOk.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onResetModal = this.onResetModal.bind(this);
	}
	onSubmit(e) {
		e.preventDefault();
		const { form, dispatch } = this.props;
		form.validateFields((err, values) => {
			if (!err) {
				const { mode = 'add' } = this.props;
				const disptachType = mode === 'add' ? 'aaaa/createWhiteList' : 'aaaa/editWhiteList';
				dispatch({
					type: disptachType,
					payload: values,
				});
			}
		});
	}
	onCancel() {
	}
	onOk() {
		this.onSubmit();
	}
	onResetModal() {
	}
	render() {
		const { form } = this.props;
		const { getFieldDecorator } = form;
		return (
			<div className="fulu-container">
				<Modal
					closable={false}
					maskClosable={false}
					centered
					onCancel={this.onCancel}
					onOk={this.onOk}
					afterClose={this.onResetModal}
					title="添加白名单"
					width="500"
				>
					<Form onSubmit={this.onSubmit} layout="inline">
						<Row gutter={{ md: 8, lg: 24, xl: 48 }}>
							<Col md={colSpan} sm={24} key="col-0">
								<FormItem label="账号类型">
									{getFieldDecorator("accountType", {
										rules: [{ required: true, message: "请选择账号类型" }],
									})(
										<Select style={{"width":"100%"}}>
											<Option key="1" value="1">
												充值账号
											</Option>
											<Option key="2" value="2">
												IP地址
											</Option>
											<Option key="3" value="3">
												买家ID
											</Option>
										</Select>
									)}
								</FormItem>
							</Col>
							<Col md={colSpan} sm={24} key="col-1">
								<FormItem label="充值账号">
									{getFieldDecorator("account", {
										rules: [{ required: true, message: "请输入充值账号" }],
									})(
										<Input />
									)}
								</FormItem>
							</Col>
							<Col md={colSpan} sm={24} key="col-2">
								<FormItem label="备注">
									{getFieldDecorator("remark")(
										<TextArea  />
									)}
								</FormItem>
							</Col>
						</Row>
					</Form>
				</Modal>
			</div>
		);
	}
}
	export default Form.create()(AddModal);
