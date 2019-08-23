import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
class aaaa extends Component {
	constructor(props) {
		super(props);
	}
	render() {
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
			</div>
		);
	}
}
export default aaaa;
