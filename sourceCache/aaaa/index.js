import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Breadcrumb, Form, Row, Col, Input, Button, Divider, Spin } from 'antd';
import columns from './columns';
import AddModal from './AddModal';
import { Table } from 'fl-pro';
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
		_columns[columns.length - 1].render = (text, record) => {
			return (
				<Fragment>
					<a onClick={() => {
						this.setState({ editData: record, AddModalMode: 'edit' });
						this.onShowModal('AddModal');
					}}>edit</a>
					<Divider type="vertical" />
					<a href="javascript:void(0);">skip</a>
				</Fragment>
			);
		};
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
										<FormItem label="Input">
											{getFieldDecorator("name-1")(
												<Input />
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
											const { selectedRows } = this.state;
											const params = selectedRows.reduce((arr, item) => {
												const _temp = {};
												["id"].forEach((pk) => {
													_temp[pk] = item[pk];
												});
												arr.push(_temp);
												return arr;
											}, []);
											this.execFetchApi('editGame', params);
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
