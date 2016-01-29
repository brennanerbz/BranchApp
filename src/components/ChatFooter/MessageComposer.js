import React, { Component, PropTypes } from 'react';
import FileUpload from './FileUpload';
import MessageForm from './MessageForm';
import { isEmpty } from '../../utils/validation';

export default class MessageComposer extends Component {
	static propTypes = {
	}

	render() {
		const { feed } = this.props;
		const emptyFeed = isEmpty(feed);
		const style = require('./ChatFooter.scss')
		return(
			<div id={style.message_composer}>
				<FileUpload
					{...this.props}
					emptyFeed={emptyFeed}
				/>
				<MessageForm
					{...this.props}
					emptyFeed={emptyFeed}
				/>
			</div>
		);
	}
}