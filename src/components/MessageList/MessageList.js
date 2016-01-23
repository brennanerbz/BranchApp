import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Message from '../Message/MessageContainer';
import $ from 'jquery';

export default class MessageList extends Component {
	static propTypes = {
	}

	componentDidMount() {
		var node = this.refs.message_list;
		this.props.handleUpdateHeight($(node)[0].clientHeight)
	}


	componentDidUpdate(prevProps) {
		var node = this.refs.message_list;
		if(prevProps.messages.length < this.props.messages.length) {
			this.props.handleUpdateHeight(node.clientHeight)
		}
	}

	render() {
		const {messages} = this.props,
		style = require('./MessageList.scss');
		return (
			<div ref="message_list" id={style.message_list}>
				{messages.map((message, i) => {
					return (
						<Message 
						key={i}
						message={message}
						/>
					)
				})}
			</div>
		);
	}
}
