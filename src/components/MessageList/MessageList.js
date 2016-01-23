import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Message from '../Message/MessageContainer';
import $ from 'jquery';

export default class MessageList extends Component {
	static propTypes = {
	}

	componentDidMount() {
	}

	componentWillUpdate() {
		var node = this.refs.message_list
		this.shouldScrollToBottom = node.scrollTop + node.offsetHeight === node.scrollHeight
	}

	componentDidUpdate() {
		if(this.shouldScrollToBottom) {
			var node = this.refs.message_list;
			node.scrollTop = node.scrollHeight;
		}
	}

	render() {
		const {messages} = this.props,
		style = require('./MessageList.scss');
		return (
			<div ref="message_list" id={style.message_list}>
				{messages.map((m, i) => {
					return <Message key={i}/>
				})}
			</div>
		);
	}
}
