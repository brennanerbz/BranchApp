import React, { Component, PropTypes } from 'react';
import FeedItem from '../FeedItem/FeedItem';

export default class FeedList extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./FeedList.scss');
		return (
			<ul id={style.feed_list}>
				{
					Array.from({length: 10}).map((b, i) => {
						return <FeedItem key={i} index={i}/>
					})
				}
			</ul>
		);
	}
}