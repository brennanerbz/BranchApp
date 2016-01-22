import React, { Component, PropTypes } from 'react';
import Message from '../Message/MessageContainer';

export default class MessageList extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./MessageList.scss');
		return (
			<div id={style.message_list}>
				{Array.from({length: 100}).map((m, i) => {
					return <Message key={i}/>
				})}
			</div>
		);
	}
}
