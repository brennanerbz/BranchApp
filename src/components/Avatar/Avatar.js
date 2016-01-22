import React, { Component, PropTypes } from 'react';

export default class Avatar extends Component {
	static propTypes = {
	}

	render() {
		return(
			<span className="avatar_wrapper inline_block">
				<div className="circle">
					<i className="fa fa-user"></i>
				</div>
			</span>
		);
	}
}