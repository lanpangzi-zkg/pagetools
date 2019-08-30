import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Breadcrumb, Spin } from 'antd';
@connect(state => state)
class aaaa extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		this.execFetchApi = this.execFetchApi.bind(this);
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
	render() {
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
				</Spin>
			</div>
		);
	}
}
export default aaaa;
