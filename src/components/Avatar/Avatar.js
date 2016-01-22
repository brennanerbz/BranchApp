import React, { Component, PropTypes } from 'react';

export default class Avatar extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./Avatar.scss'),
		defaultProfilePic = require('./DefaultProfilePic.png')
		return (
			<span className={'inline_block' + ' ' + style.avatar_wrapper}>
				<div 
				style={{border: '1px solid #e6e6e6'}} 
				className={
					'circle' 
					+ ' ' + style.circle_avatar
					+ ' ' + style.c_32
				}>
					<img src={defaultProfilePic}/>
				</div>
			</span>
		);
	}
}
