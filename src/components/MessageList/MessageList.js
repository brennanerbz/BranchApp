import React, { Component, PropTypes } from 'react';
import Message from '../Message/MessageContainer';
import {connect} from 'react-redux';

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
		let { feed, branch, messages } = this.props,
		style = require('./MessageList.scss');
		let filteredMessages = messages.filter(message => {
			return message.feed_id === feed.id
		})
		return (
			<div id={style.message_list}>
				{filteredMessages.map((message, i) => {
					return (
						<Message 
							key={'message' + message.id + i}
							message={message}
						/>
					)
				})}
			</div>
		);
	}
}
