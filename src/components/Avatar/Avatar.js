import React, { Component, PropTypes } from 'react';

export default class Avatar extends Component {
	static propTypes = {
		size: PropTypes.number,
		message: PropTypes.bool
	}

	render() {
		const { size, message } = this.props,
		style = require('./Avatar.scss'),
		defaultProfilePic = require('./DefaultProfilePic.png')
		return (
			<span className={
				'inline_block' 
				+ ' ' + style.avatar_wrapper
				+ ' ' + (message ? style.avatar_message : '')
			}>
				<div 
				// style={{border: '1px solid #e6e6e6'}} 
				className={
					'circle' 
					+ ' ' + style.circle_avatar
					+ ' ' + style[`c_${String(size)}`]
				}>
					<img src={defaultProfilePic}/>
				</div>
			</span>
		);
	}
}
