import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import { bindActionCreators } from 'redux';

import * as messageActions from '../../redux/modules/messages';
import MessageComposer from './MessageComposer'

@connect(state => ({
		user: state.auth.user
	}),
	dispatch => ({
		...bindActionCreators({
			...messageActions,
			pushState
		}, dispatch)
	})
)
export default class ChatFooter extends Component {
	static propTypes = {
	}

	render() {
		const { user } = this.props;
	    const style = require('./ChatFooter.scss');
		return (
			<div id={style.chat_footer}>
				{
					user
					? 
					<MessageComposer {...this.props}/>
					:
					<div id={style.chat_footer_call_to_action}>
					</div>
				}
			</div>
		);
	}
}
