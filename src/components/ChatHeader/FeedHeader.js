import React, { Component, PropTypes } from 'react';

export default class FeedHeader extends Component {
	static propTypes = {
	}

	render() { 
		const { feed, branch } = this.props,
		style = require('./FeedHeader.scss');
		return (
			<div 
			id={style.feed_header} 
			className="overflow_ellipsis float_left">
				<h2>
					<span id={style.name}>
						<span id={style.prefix_icon}>#</span>
						{feed.title}
					</span>
					<span id={style.members}>
						<span id={style.member_icon}>
							<i className="fa fa-user"></i>
						</span>
						<span id={style.member_count}>3</span>
					</span>
				</h2>
			</div>
		);
	}
}
