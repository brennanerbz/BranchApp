import React, { Component, PropTypes } from 'react';
import ExploreBox from '../ExploreBox/ExploreBox';
import FeedHeader from './FeedHeader';
import UserInfo from '../UserInfo/UserInfo';

export default class ChatHeader extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./ChatHeader.scss');
		return(
			<div id={style.chat_header}>
				<div id={style.chat_header_wrapper}>
					<ExploreBox/>
					<FeedHeader/>
					<UserInfo/>
				</div>
			</div>
		);
	}
}