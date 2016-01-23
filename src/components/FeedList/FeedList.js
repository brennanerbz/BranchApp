import React, { Component, PropTypes } from 'react';
import FeedItem from '../FeedItem/FeedItem';

export default class FeedList extends Component {
	static propTypes = {
	}

	render() {
		const { feeds, activeFeed, onChangeActiveFeed } = this.props,
		style = require('./FeedList.scss');
		return (
			<ul id={style.feed_list}>
				{
					feeds.map((feed, i) => {
						return (
							<FeedItem 
							key={i} 
							index={i}
							feed={feed}
							active={feed.id == activeFeed}
							changeActiveFeed={onChangeActiveFeed}/>
						)
					})
				}
			</ul>
		);
	}
}