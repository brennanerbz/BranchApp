import React, { Component, PropTypes } from 'react';
import ExploreBox from '../ExploreBox/ExploreBox';
import FeedHeader from './FeedHeader';
import UserInfo from '../UserInfo/UserInfo';

export default class ChatHeader extends Component {
	static propTypes = {
	}

	render() {
		const styles = require('./ChatHeader.scss');
		return (
			<div id={styles.chat_header}>
				<div id={styles.chat_header_wrapper} className="clearfix">
					<ExploreBox/>
					<FeedHeader/>
					<UserInfo/>
				</div>
			</div>
		);
	}
}