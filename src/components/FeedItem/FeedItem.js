import React, { Component, PropTypes } from 'react';

export default class FeedItem extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./FeedItem.scss');
		return (
			<div className={style.feed_item_wrapper}>
				<h4># Feed</h4>
			</div>
		);
	}
}