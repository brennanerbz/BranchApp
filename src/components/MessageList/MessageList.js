import React, { Component, PropTypes } from 'react';
import Message from '../Message/MessageContainer';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';
import { isEmpty } from '../../utils/validation';

import DayDivider from '../Message/DayDivider';

@connect(
	state => ({
		unfilteredMessages: state.messages.unfilteredMessages
	}),
	dispatch => ({
	})
)
export default class MessageList extends Component {
	static propTypes = {
	}

	state = {
		messages: []
	}

	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {
	}

	componentWillUpdate(nextProps) {
	}

	componentDidUpdate(prevProps) {
	}

	render() {
		const style = require('./MessageList.scss');
		const { user, feed, branch, membership, messages } = this.props;
		
		var messageList = [];
		var today = moment();
		var day, prevDay;
		!isEmpty(messages) && messages.length > 0 && messages.map((group, i) => {
			day = group[0].creation
			day = moment(day)
			if(i === 0 || (!day.isSame(prevDay, 'day') && !today.isSame(moment(messages[0][0].creation), 'day'))) {
				messageList.push(
					<DayDivider key={'divider' + i} date={day}/>
				);
			} 
		    messageList.push(
				<h1 key={'group' + i}>Group</h1>
			);
			prevDay = day;
		})
		return (
			<div style={{flex: '1'}} id={style.message_list}>
				{messageList}
			</div>
		);
	}
}
