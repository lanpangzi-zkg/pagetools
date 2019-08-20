import React, { Component } from 'react';
import { Form, Table }from antd;
const FormItem = Form.Item;
class aaaa extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}
	onSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				// add code here...
			}
		});
	}
	render() {
		const { form } = this.props;
		const { getFieldDecorator } = form;
		return (
			<div className="fulu-container">
				<div class="fulu-box">
					<div className="cell-1">
						<Form onSubmit={this.onSubmit} layout="inline">
							<Row gutter={{ md: 8, lg: 24, xl: 48 }}>
								<Col md={colSpan} sm={24} key="col-0">
									<FormItem label="Input">
										{getFieldDecorator("name-0")(
											<Input />
										)}
									</FormItem>
								</Col>
								<Col md={colSpan} sm={24} key="col-1">
									<FormItem label="Select">
										{getFieldDecorator("name-1")(
											<Select style={{"width":"100%"}}>
											</Select>
										)}
									</FormItem>
								</Col>
								<Col md={colSpan} sm={24} key="col-2">
									<FormItem>
										<span className="btn-group">
											<Button key="btn-1" htmlType="submit" type="primary">
												查询
											</Button>
										</span>
									</FormItem>
								</Col>
							</Row>
						</Form>
					</div>
					<div className="cell-1">
						<Table
							columns={this.columns}
							dataSource={[]}
							rowKey="id"
							rowSelection={{"type":"checkbox"}}
						/>
					</div>
				</div>
			</div>
		);
	}
}
export default Form.create()(aaaa);
