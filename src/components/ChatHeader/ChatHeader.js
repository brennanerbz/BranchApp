import React, { Component, PropTypes } from 'react';
import ExploreBox from '../ExploreBox/ExploreBox';
import FeedHeader from './FeedHeader';
import UserInfo from '../UserInfo/UserInfo';

export default class ChatHeader extends Component {
	static propTypes = {
	}

	render() {
		const { user, feed, branch } = this.props,
		styles = require('./ChatHeader.scss');
		return (
			<div id={styles.chat_header}>
				<div id={styles.chat_header_wrapper} className="clearfix">
					<ExploreBox/>
					<FeedHeader
						feed={feed}
						branch={branch}
					/>
					{
						user
						?
						<UserInfo/>
						:
						<div style={{paddingRight: '1em', paddingTop: '0.75em'}} className="float_right">
							<button style={{marginRight: '5px'}} className="button outline">Log In</button>
							<button className="button primary">Sign Up</button>
						</div>
					}
				</div>
			</div>
		);
	}
}