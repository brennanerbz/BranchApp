import React, { Component, PropTypes } from 'react';

export default class FeedItem extends Component {
	static propTypes = {
	}

	render() {
		const { index, feed, active, changeActiveFeed} = this.props,
		style = require('./FeedItem.scss');
		return (
			<li 
			onClick={() => {
				if(!active) changeActiveFeed(feed)
			}}
			className={'feed' + 
			index + ' ' + 
			style.feed + ' ' + 
			(active ? style.active : '')
			+ (index == 1 ? style.unread : '')}>
				<a className={style.feed_name}>
					<span className="overflow_ellipsis">
						<span className={style.prefix_icon}>#</span>
						{ feed.title }
					</span>
				</a>
			</li>
		);
	}
}