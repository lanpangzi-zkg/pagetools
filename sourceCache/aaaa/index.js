import React, { Component } from 'react';
import { Form, Divider, Table } from 'antd';
import columns from './columns';
const FormItem = Form.Item;
class aaaa extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			PageIndex: 1,
			PageSize: 10,
		};
		this.columns = this.onInitColumns(columns);
	}
	onSubmit(e) {
		e.preventDefault();
		const { form, dispatch } = this.props;
		form.validateFields((err, values) => {
			if (!err) {
				dispatch({
					type: 'aaaa/getWhiteListPageList',
					payload: values,
				});
			}
		});
	}
	onSubmitModal = (modalName, modelType, payload) => {
		this.props.dispatch({
			type: `aaaa/${modelType}`,
			payload,
		}).then((result) => {
			if (result && result.data && result.data.code == '0') {
				this.onToggleModal(modalName);
			}
		});
	}
	onToggleModal = (modalName) => {
		this.setState({
			[`show${modalName}`]: false,
		});
	}
	onInitColumns = (columns) => {
		const _columns = columns;
		_columns[columns.length - 1].render = (text, record) => {
			return (
				<a onClick={() => {
					this.setState({ editData: record });
					this.showModal('AddModal');
				}}>edit</a>
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
			ageIndex: current,
			PageSize: size,
		});
	}
	render() {
		const { form } = this.props;
		const { getFieldDecorator } = form;
		const { form } = this.props.aaaa;
		const { PageIndex, PageSize } = this.state;
		const { whiteListTotal, whiteListList } = this.props.aaaa;
		return (
			<div className="fulu-container">
				<div className="fulu-header">
					<div className="cell-1">
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
				<div class="fulu-box">
					<div className="cell-1">
						<Form onSubmit={this.onSubmit} layout="inline">
							<Row gutter={{ md: 8, lg: 24, xl: 48 }}>
								<Col md={colSpan} sm={24} key="col-0">
									<FormItem label="账号类型">
										{getFieldDecorator("accountType")(
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
										{getFieldDecorator("account")(
											<Input />
										)}
									</FormItem>
								</Col>
								<Col md={colSpan} sm={24} key="col-2">
									<FormItem>
										<div style={{"textAlign":"left"}}>
											<span className="btn-group">
												<Button key="btn-1" htmlType="submit" type="primary">
													查询
												</Button>
												<Button key="btn-2" htmlType="reset" type="button">
													重置
												</Button>
											</span>
										</div>
									</FormItem>
								</Col>
							</Row>
						</Form>
					</div>
					<div className="cell-1">
						<Divider />
					</div>
					<div className="cell-1">
						<div style={{"textAlign":"right"}}>
							<span className="btn-group">
								<Button key="btn-1" htmlType="button" type="primary">
									新增
								</Button>
							</span>
						</div>
					</div>
					<div className="cell-1">
						<Table
							columns={this.columns}
							dataSource={whiteList}
							pagination={{
								showQuickJumper,
								showSizeChanger,
								total: whiteListTotal,
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
					visible={this.state.showAddModal}
					onCancel={this.onToggleModal}
					onOk={this.onSubmitModal}
				/>
			</div>
		);
	}
}
	export default Form.create()(aaaa);
