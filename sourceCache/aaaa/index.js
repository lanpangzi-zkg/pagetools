import React, { Component, Fragment } from 'react';
import { Form, Input, Button, Divider, Table } from 'antd';
import columns from './columns';
const FormItem = Form.Item;
class aaaa extends Component {
	constructor(props) {
		super(props);
		this.state = {
			PageIndex: 1,
			PageSize: 10,
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.columns = this.onInitColumns(columns);
	}
	onSubmit(e) {
		e && e.preventDefault();
		const { form, dispatch } = this.props;
		form.validateFields((err, values) => {
			if (!err) {
				dispatch({
					type: 'aaaa/getGamePageList',
					payload: values,
				});
			}
		});
	}
	onHiddenModal = (modalName) => {
		this.setState({
			[`show${modalName}`]: false,
		});
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
						this.setState({ editData: record, initAddModalApi: 'getGamePageList' });
						this.onShowModal('AddModal');
					}}>edit</a>
					<Divider type="vertical" />
					<span>view</span>
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
				<div className="fulu-header">
					<div className="cell-1">
					</div>
				</div>
				<div class="fulu-box">
					<div className="cell-1">
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
												<Button key="btn-1" htmlType="submit" type="primary">
													查询
												</Button>
											</span>
										</div>
									</FormItem>
								</Col>
							</Row>
						</Form>
					</div>
					<div className="cell-1">
						<Table
							columns={this.columns}
							dataSource={gamePageList}
							pagination={{
								showQuickJumper,
								showSizeChanger,
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
					{...this.props}
					editData={this.state.editData}
					initApi={this.state.initAddModalApi}
					visible={this.state.showAddModal}
					onCancel={this.onHiddenModal}
				/>
			</div>
		);
	}
}
export default Form.create()(aaaa);
