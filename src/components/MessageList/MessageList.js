import React, { Component, PropTypes } from 'react';
import Message from '../Message/MessageContainer';
import {connect} from 'react-redux';
import moment from 'moment';

export default class MessageList extends Component {
	static propTypes = {
	}

	componentDidMount() {
		var node = this.refs.message_list;
		// this.props.handleUpdateHeight($(node)[0].clientHeight)
	}

	componentWillReceiveProps(nextProps) {
	}

	componentWillUpdate(nextProps) {
	}

	componentDidUpdate(prevProps) {
		var node = this.refs.message_list;
	}

	render() {
		const { user, feed, branch, membership, messages } = this.props;
		const style = require('./MessageList.scss');
		let messagesList = [];
		let filteredMessages = messages.filter(message => {
			return message.feed_id === feed.id && feed.parent_id === branch.id
		})
		var newUser = true, currentUserId = '', oldUserId = '',
		showSeparator = false, currentDay, previousDay;
		filteredMessages.map((message, i) => {

			// First message anchor logic
			currentUserId = message.user_id
			if(i == 0) newUser = true
			else if(currentUserId !== oldUserId) newUser = true
			else if(currentUserId == oldUserId) newUser = false
			oldUserId = currentUserId

			// Day divider logic
			currentDay = moment.utc(message.creation)
			if(i == 0) showSeparator = true
			else if(currentDay.isSame(previousDay, 'day')) showSeparator = false
			else showSeparator = true
			previousDay = currentDay

			if(showSeparator) {
				messagesList.push(
					<div key={'divider' + message.creation} className={style.day_divider}>
						<hr className="separator"/>
						<div className={style.day_divider_label}>
							{moment.utc(message.creation).local().calendar(null, {
								sameDay: '[Today]',
							    nextDay: '[Tomorrow]',
							    nextWeek: 'dddd',
							    lastDay: '[Yesterday]',
							    lastWeek: '[Last] dddd',
							    sameElse: 'DD/MM/YYYY'
							})}
						</div>
					</div>
				)
			}

			messagesList.push(
				<Message
					key={'message' + message.id + i}
					firstMessage={newUser}
					message={message}
					feed={feed}
					membership={membership}
					user={user}
				/>
			)
		})
		return (
			<div id={style.message_list}>
				{messagesList}
			</div>
		);
	}
}
