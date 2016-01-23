import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Message from '../Message/MessageContainer';
import $ from 'jquery';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import { bindActionCreators } from 'redux';


export default class MessageList extends Component {
	static propTypes = {
	}

	componentDidMount() {
		var node = this.refs.message_list;
		// this.props.handleUpdateHeight($(node)[0].clientHeight)
	}


	componentDidUpdate(prevProps) {
		var node = this.refs.message_list;
		if(prevProps.messages.length < this.props.messages.length) {
			// this.props.handleUpdateHeight(node.clientHeight)
		}
	}

	render() {
		let {feed, branch, messages} = this.props,
		style = require('./MessageList.scss');
		let filteredMessages = messages.filter(message => {
			return message.feed_id === feed.id
		})
		return (
			<div ref="message_list" id={style.message_list}>
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
