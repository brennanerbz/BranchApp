import React, { Component, PropTypes } from 'react';
import ExploreBox from '../ExploreBox/ExploreBox';
import FeedHeader from './FeedHeader';
import UserInfo from '../UserInfo/UserInfo';


export default class ChatHeader extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div id="chat_header">
				<h1>Chat header</h1>
				<span id="branch_logo">
					<h2>Branch logo</h2>
				</span>
				<ExploreBox/>
				<FeedHeader/>
				<UserInfo/>
			</div>
		);
	}
}