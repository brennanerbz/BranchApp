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
		const { feed, branch } = nextProps;
		var messages = this.createMessageList(nextProps.messages.filter(message => { 
			return message.feed_id === feed.id && feed.parent_id === branch.id
		}))
		console.log('messageGroups: ', messages)
	}

	createMessageList(messages) {
		var list = [];
		var group = [];
		var message, prevMessage;
		for(var i = 0; i < messages.length; i++) {
			message = messages[i]
			if(i === 0) group.push(message)
			else if(message.user_id === prevMessage.user_id) group.push(message)
			else if(message.user_id !== prevMessage.user_id) {
				list.push(group)
				group = [];
				group.push(message);
			}
			if(i === messages.length - 1) list.push(group)
			prevMessage = message;
		}
		return list;
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
		showSeparator = false, currentDay, previousDay, today = moment().utc(), firstDay, todayIsFirstDivider = false;
		filteredMessages.map((message, i) => {

			// First message anchor logic
			currentUserId = message.user_id
			if(i == 0) newUser = true
			else if(currentUserId !== oldUserId) newUser = true
			else if(currentUserId == oldUserId) newUser = false
			oldUserId = currentUserId

			// Day divider logic
			currentDay = moment.utc(message.creation)
			if(i == 0) {
				showSeparator = true 
				firstDay = currentDay;
			}
			else if(currentDay.isSame(previousDay, 'day')) showSeparator = false
			else showSeparator = true
			previousDay = currentDay

			if(showSeparator) {
				if(todayIsFirstDivider && currentDay.isSame(today, 'day')) {
					return;
				} else {
					messagesList.push(
						<div key={'divider' + message.creation} className={style.day_divider}>
							<hr className="separator"/>
							<div className={style.day_divider_label}>
								{currentDay.local().calendar(null, {
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
				if(firstDay.isSame(today, 'day')) todayIsFirstDivider = true;
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
			<div style={{flex: '1'}} id={style.message_list}>
				{messagesList}
			</div>
		);
	}
}
