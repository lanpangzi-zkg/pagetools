	import React, { Component, Fragment } from 'react';
	import { connect } from 'dva';
	import { Breadcrumb, Form, Row, Col, Input, Select, DatePicker, Button, Divider, Spin } from 'antd';
	import columns from './columns';
	import AddModal from './AddModal';
	import moment from 'monent';
	import { Table } from 'fl-pro';
	const { Option } = Select;
	const FormItem = Form.Item;
	@connect(state => state)
	class aaaa extends Component {
		constructor(props) {
			super(props);
			this.state = {
				loading: false,
				PageIndex: 1,
				PageSize: 10,
				selectedRowKeys: [],
				selectedRows: [],
			};
			this.execFetchApi = this.execFetchApi.bind(this);
			this.onSubmit = this.onSubmit.bind(this);
			this.onError = this.onError.bind(this);
			this.onToggleLoading = this.onToggleLoading.bind(this);
			this.columns = this.onInitColumns(columns);
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
			const { form, dispatch } = this.props;
			form.validateFields((err, values) => {
				if (!err) {
					values['name-2'] = values['name-2'] && values['name-2'].format('YYYY-MM-DD');
					values['name-3'] = values['name-3'] && values['name-3'].format('YYYY-MM-DD');
					this.onToggleLoading();
					dispatch({
						type: 'aaaa/getGamePageList',
						payload: values,
					}).then(() => {
						this.onToggleLoading();
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
		onInitColumns = (columns) => {
			const _columns = columns;
			return _columns;
		}
		onPageIndexChange = (page, pageSize) => {
			this.setState({
				PageIndex: page,
				PageSize: pageSize,
			})
		}
		onShowSizeChange = (current, size) => {
			this.setState({
				PageIndex: current,
				PageSize: size,
			});
		}
		render() {
			const { form } = this.props;
			const { getFieldDecorator } = form;
			const { PageIndex, PageSize } = this.state;
			const { gamePageListTotal, gamePageList } = this.props.aaaa;
			return (
				<div className="fulu-container">
					<Spin spinning={this.state.loading}>
						<div className="fulu-header">
							<div className="cell cell-1">
								<Breadcrumb>
									<Breadcrumb.Item key="breadcrumb-0">
										<span>menu1</span>
									</Breadcrumb.Item>
									<Breadcrumb.Item key="breadcrumb-1">
										<span>menu2</span>
									</Breadcrumb.Item>
								</Breadcrumb>
							</div>
						</div>
						<div className="fulu-box">
							<div className="cell cell-1">
								<Form onSubmit={this.onSubmit} layout="inline">
									<Row gutter={{ md: 8, lg: 24, xl: 48 }}>
										<Col md={8} sm={24}>
											<FormItem label="Input">
												{getFieldDecorator("name-0")(
													<Input />
												)}
											</FormItem>
										</Col>
										<Col md={8} sm={24}>
											<FormItem label="Select">
												{getFieldDecorator("name-1")(
													<Select style={{"width":"100%"}}>
													</Select>
												)}
											</FormItem>
										</Col>
										<Col md={8} sm={24}>
											<FormItem label="DatePicker">
												{getFieldDecorator("name-2")(
													<DatePicker style={{ width: '100%' }}  showTime={false} format="undefined" />
												)}
											</FormItem>
										</Col>
										<Col md={8} sm={24}>
											<FormItem label="RangePicker">
												{getFieldDecorator("name-3")(
													<RangePicker style={{ width: '100%' }} showTime={false} format="undefined" />
												)}
											</FormItem>
										</Col>
										<Col md={8} sm={24}>
											<FormItem>
												<div style={{"textAlign":"left"}}>
													<span className="btn-group">
														<Button
															htmlType="submit"
															type="primary"
														>
															查询
														</Button>
														<Button
															htmlType="reset"
															type="button"
															onClick={this.onResetForm}
														>
															重置
														</Button>
													</span>
												</div>
											</FormItem>
										</Col>
									</Row>
								</Form>
							</div>
							<div className="cell cell-1">
								<Divider />
							</div>
							<div className="cell cell-1">
								<div style={{"textAlign":"right"}}>
									<span className="btn-group">
										<Button
											htmlType="button"
											disabled={this.state.selectedRowKeys.length === 0}
											onClick={() => {
												const { selectedRowKeys } = this.state;
												this.execFetchApi('getGamePageList', selectedRowKeys);
											}}
										>
											批量
										</Button>
										<Button
											htmlType="button"
											type="primary"
											onClick={() => {() => this.onShowModal('AddModal');}}
										>
											新增
										</Button>
										<Button
											htmlType="button"
											onClick={() => this.props.history.push('https://www.baidu.com/')}
										>
											跳转
										</Button>
									</span>
								</div>
							</div>
							<div className="cell cell-1">
								<Table
									columns={this.columns}
									dataSource={gamePageList}
									pagination={{
										showQuickJumper: true,
										showSizeChanger: true,
										total: gamePageListTotal,
										current: PageIndex,
										pageSize: PageSize,
										onChange: this.onPageIndexChange,
										onShowSizeChange: this.onShowSizeChange,
									}}
									rowKey="id"
									rowSelection={{
										type: checkbox,
										selectedRowKeys: this.state.selectedRowKeys,
										onChnage: (selectedRowKeys, selectedRows) => {
											this.setState({
												selectedRowKeys,
												selectedRows,
											});
										}
									}}
								/>
							</div>
						</div>
						<AddModal
							dispatch={this.props.dispatch}
							editData={this.state.editData}
							mode={this.state.AddModalMode}
							initApi={this.state.initAddModalApi}
							visible={this.state.showAddModal}
							onCancel={this.onHiddenModal}
						/>
					</Spin>
				</div>
			);
		}
	}
export default Form.create()(aaaa);
