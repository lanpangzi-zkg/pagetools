import React, { Component } from 'react';
import { Form, Input, Modal, Spin } from 'antd';
const FormItem = Form.Item;
class AddModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onOk = this.onOk.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onResetModal = this.onResetModal.bind(this);
		this.initEdit = false;
	}
	componentDidUpdate() {
		const { loading } = this.state;
		const { mode, visible, initApi, editData, dispatch } = this.props;
		// 编辑模式，初始化表单
		if (visible && mode === 'edit' && !this.initEdit && recordData && !loading) {
			// 调用接口初始化表单
			if (initApi) {
				dispatch({
					type: `aaaa/${initApi}`,
					payload: recordData
				}).then((result) => {
					const { code, data } = result;
					if (code === '0') {
						this.onInitForm(data);
					}
				});
			}
			else {
				this.onInitForm(editData);
			}
		}
	}
	onInitForm(formData) {
		const { editData, form } = this.props;
		const formData = ['gameId','gameName','flGameName'].reduce((obj, dataKey) => {
			obj[dataKey] = editData[dataKey];
			return obj;
			}, {});
			form.setFieldsValue(formData);
			this.initEdit = true;
		}
		onSubmit(e) {
			e && e.preventDefault();
			const { form, dispatch } = this.props;
			form.validateFields((err, values) => {
				if (!err) {
					const { mode = 'add' } = this.props;
					const disptachType = mode === 'add' ? 'aaaa/createGame' : 'aaaa/editGame';
					dispatch({
						type: disptachType,
						payload: values,
					});
				}
			});
		}
		onCancel() {
			const { onToggleModal } = this.props;
			onToggleModal();
			this.onResetModal();
		}
		onOk() {
			this.onSubmit();
		}
		onResetModal() {
			this.initEdit = false;
			this.props.form.resetFields();
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
						title="添加游戏"
						width="500"
					>
						<Spin spinning={this.state.loading}>
							<Form onSubmit={this.onSubmit} layout="inline">
								<Row gutter={{ md: 8, lg: 24, xl: 48 }}>
									<Col md={24} sm={24}>
										<FormItem label="店铺游戏ID">
											{getFieldDecorator("gameId", {
												rules: [{ required: true, message: "请输入店铺游戏ID" }],
											})(
												<Input />
											)}
										</FormItem>
									</Col>
									<Col md={24} sm={24}>
										<FormItem label="店铺游戏名称:">
											{getFieldDecorator("gameName", {
												rules: [{ required: true, message: "请输入店铺游戏名称:" }],
											})(
												<Input />
											)}
										</FormItem>
									</Col>
									<Col md={24} sm={24}>
										<FormItem label="游戏名称">
											{getFieldDecorator("flGameName", {
												rules: [{ required: true, message: "请输入游戏名称" }],
											})(
												<Input />
											)}
										</FormItem>
									</Col>
								</Row>
							</Form>
						</Spin>
					</Modal>
				</div>
			);
		}
	}
export default Form.create()(AddModal);
