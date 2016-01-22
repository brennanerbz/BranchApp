import React, { Component, PropTypes } from 'react';
import Message from '../Message/MessageContainer';
import $ from 'jquery';

export default class MessageList extends Component {
	static propTypes = {
	}

	componentDidMount() {
		const node = this.refs.message_list
		setTimeout(() => {
			$(node).stop().animate({
			  scrollTop: $(node)[0].scrollHeight
			}, 800);
		}, 100)
	}

	render() {
		const style = require('./MessageList.scss');
		return (
			<div ref="message_list" id={style.message_list}>
				{Array.from({length: 100}).map((m, i) => {
					return <Message key={i}/>
				})}
			</div>
		);
	}
}
