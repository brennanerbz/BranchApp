import React, { Component, PropTypes } from 'react';

export default class FeedHeader extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./FeedHeader.scss');
		return (
			<div style={{border: '1px solid blue'}} id={style.feed_header} className="overflow_ellipsis float_left">
				<h2>
					<span className="name">
						<span className="prefix_icon feed"></span>
						Feed name
					</span>
					<span className="members">
						<span className="prefix_icon member"></span>
						<span className="member_count">3</span>
					</span>
				</h2>
			</div>
		);
	}
}