import React, { Component, PropTypes } from 'react';

import Avatar from '../Avatar/Avatar';

export default class UserInfo extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./UserInfo.scss');
		return (
			<div 
			id={style.user_info} 
			className="float_right">
				<span className="bubble_dropdown_container">
					<button ref="dropdown_target" className="button_as_link">
						<Avatar/>
						<span id={style.username} className="inline_block">
							username
						</span>
						<i
						id={style.dropdown_arrow}
						style={{fontSize: '21px'}} 
						className="fa fa-angle-down"></i>
					</button>
				</span>
			</div>
		);
	}
}
