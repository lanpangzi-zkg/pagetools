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
		};
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
					}}>编辑</a>
					<Divider type="vertical" />
					<span>游戏区列表</span>
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
									<span>游戏管理</span>
								</Breadcrumb.Item>
								<Breadcrumb.Item key="breadcrumb-1">
									<span>游戏列表</span>
								</Breadcrumb.Item>
							</Breadcrumb>
						</div>
					</div>
					<div className="fulu-box">
						<div className="cell cell-1">
							<Form onSubmit={this.onSubmit} layout="inline">
								<Row gutter={{ md: 8, lg: 24, xl: 48 }}>
									<Col md={8} sm={24}>
										<FormItem label="店铺游戏ID">
											{getFieldDecorator("GameId")(
												<Input placeholder="店铺游戏ID"/>
											)}
										</FormItem>
									</Col>
									<Col md={8} sm={24}>
										<FormItem label="店铺游戏名称">
											{getFieldDecorator("GameName")(
												<Input placeholder="店铺游戏名称"/>
											)}
										</FormItem>
									</Col>
									<Col md={8} sm={24}>
										<FormItem>
											<div style={{"textAlign":"left"}}>
												<span className="btn-group">
													<Button htmlType="submit" type="primary">
														查询
													</Button>
													<Button htmlType="reset" type="button">
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
									<Button htmlType="button" type="primary" onClick={() => {() => this.onShowModal('AddModal');}}>
										添加游戏
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
								rowSelection={{"type":"checkbox"}}
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
