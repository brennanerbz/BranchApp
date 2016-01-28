import React, { Component, PropTypes } from 'react';
import FileUpload from './FileUpload';
import MessageForm from './MessageForm';

export default class MessageComposer extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./ChatFooter.scss')
		return(
			<div id={style.message_composer}>
				<FileUpload
					{...this.props}
				/>
				<MessageForm
					{...this.props}
				/>
			</div>
		);
	}
}