import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import { bindActionCreators } from 'redux';

import * as messageActions from '../../redux/modules/messages';

import FileUpload from './FileUpload';
import MessageForm from './MessageForm';

@connect(state => ({

	}),
	dispatch => ({
		...bindActionCreators({
			...messageActions,
			pushState
		}, dispatch)
	})
)
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