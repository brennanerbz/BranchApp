import React, { Component, PropTypes } from 'react';

export default class FeedHeader extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div id="feed_header" className="overflow_ellipsis">
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