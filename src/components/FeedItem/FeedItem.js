import React, { Component, PropTypes } from 'react';

export default class FeedItem extends Component {
	static propTypes = {
	}

	render() {
		const { index } = this.props,
		style = require('./FeedItem.scss');
		return (
			<li 
			className={'feed' + 
			index + ' ' + 
			style.feed + ' ' + 
			(index == 0 ? style.active : '')
			+ (index == 1 ? style.unread : '')}>
				<a className={style.feed_name}>
					<span className="overflow_ellipsis">
						<span className={style.prefix_icon}>#</span>
						feedname
					</span>
				</a>
			</li>
		);
	}
}