import React, { Component } from 'react';
import { Form, Row, Col, Input, DatePicker, Modal, Spin, message } from 'antd';
import moment from 'monent';
const FormItem = Form.Item;
class AddModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};
		this.execFetchApi = this.execFetchApi.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onError = this.onError.bind(this);
		this.onToggleLoading = this.onToggleLoading.bind(this);
		this.onOk = this.onOk.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onResetModal = this.onResetModal.bind(this);
		this.initEdit = false;
	}
	componentDidUpdate() {
		const { loading } = this.state;
		const { mode, visible, initApi, editData, dispatch } = this.props;
		// 编辑模式，初始化表单
		if (visible && mode === 'edit' && !this.initEdit && editData && !loading) {
			// 调用接口初始化表单
			if (initApi) {
				this.onToggleLoading();
				dispatch({
					type: `aaaa/${initApi}`,
					payload: editData
				}).then((result) => {
					this.onToggleLoading();
					const { code, data } = result;
					if (code === '0') {
						this.onInitForm(data);
					}
				}).catch(this.onError);
			}
			else {
				this.onInitForm(editData);
			}
		}
	}
	onInitForm(editData) {
		const { form } = this.props;
		const formData = ['gameId','gameName','flGameName'].reduce((obj, dataKey) => {
			obj[dataKey] = editData[dataKey];
			return obj;
		}, {});
		if (editData['a']) {
			formData['a'] = moment(editData['a'], 'YYYY-MM-DD');
		}
		form.setFieldsValue(formData);
		this.initEdit = true;
	}
	onError(e) {
		this.onToggleLoading();
	}
	onToggleLoading() {
		this.setState({
			loading: !this.state.loading,
		});
	}
	execFetchApi(api, params) {
		const { dispatch } = this.props;
		this.onToggleLoading();
		dispatch({
			type: `aaaa/${api}`,
			payload: params,
		}).then(() => {
			this.onToggleLoading();
		}).catch(this.onError);
	}
	onSubmit(e) {
		e && e.preventDefault();
		const { form, dispatch, editData } = this.props;
		form.validateFields((err, values) => {
			if (!err) {
				const { mode = 'add' } = this.props;
				const disptachType = mode === 'add' ? 'aaaa/createGame' : 'aaaa/editGame';
				values['a'] = values['a'] && values['a'].format('YYYY-MM-DD');
				if (mode === 'edit') {
					values.id = editData.id;
				}
				this.onToggleLoading();
				dispatch({
					type: disptachType,
					payload: values,
				}).then((res) => {
					this.onToggleLoading();
					const { code } = res;
					if (code === '0') {
						message.success('保存成功');
						this.onCancel(true);
					}
				}).catch(this.onError);
			}
		});
	}
	onResetForm = () => {
		this.props.form.resetFields();
	}
	onHiddenModal = (modalName, updateList) => {
		this.setState({
			[`show${modalName}`]: false,
		});
		if (updateList && typeof this.onSubmit === 'function') {
			this.onSubmit();
		}
	}
	onShowModal = (modalName) => {
		this.setState({
			[`show${modalName}`]: true,
		});
	}
	onCancel(updateList = false) {
		const { loading } = this.state;
		if (loading) {
			return;
		}
		const { onCancel } = this.props;
		onCancel('AddModal', updateList);
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
			<div className="fulu-modal-container">
				<Modal
					maskClosable={false}
					centered
					visible={this.props.visible}
					onCancel={this.onCancel}
					onOk={this.onOk}
					afterClose={this.onResetModal}
					title="添加白名单"
					width={500}
				>
					<Spin spinning={this.state.loading}>
						<Form onSubmit={this.onSubmit} layout="inline">
							<Row gutter={{ md: 24, lg: 24, xl: 48 }}>
								<Col md={24} sm={24}>
									<FormItem label="店铺游戏ID" labelCol={{span: 6}} wrapperCol ={{span: 14}}>
										{getFieldDecorator("gameId", {
											rules: [{ required: true, message: "请输入店铺游戏ID" }],
										})(
											<Input />
										)}
									</FormItem>
								</Col>
								<Col md={24} sm={24}>
									<FormItem label="店铺游戏名称" labelCol={{span: 6}} wrapperCol ={{span: 14}}>
										{getFieldDecorator("gameName", {
											rules: [{ required: true, message: "请输入店铺游戏名称" }],
										})(
											<Input />
										)}
									</FormItem>
								</Col>
								<Col md={24} sm={24}>
									<FormItem label="游戏名称" labelCol={{span: 6}} wrapperCol ={{span: 14}}>
										{getFieldDecorator("flGameName", {
											rules: [{ required: true, message: "请输入游戏名称" }],
										})(
											<Input />
										)}
									</FormItem>
								</Col>
								<Col md={24} sm={24}>
									<FormItem label="DatePicker" labelCol={{span: 6}} wrapperCol ={{span: 14}}>
										{getFieldDecorator("a")(
											<DatePicker style={{ width: '100%' }}  showTime={false} format="YYYY-MM-DD" />
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
