import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import { bindActionCreators } from 'redux';

import * as messageActions from '../../redux/modules/messages';
import MessageComposer from './MessageComposer'

@connect(state => ({
		user: state.auth.user,
		typers: state.messages.typers
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
		const { typers, user, feed, pushState } = this.props;
	    const style = require('./ChatFooter.scss');
		return (
			<div className={user ? '' : style.prompt_footer} id={style.chat_footer}>
				{
					user
					? 
					<MessageComposer {...this.props}/>
					:
					<div style={{padding: '1.35em 1em 1em', textAlign: 'center'}} id={style.chat_footer_call_to_action}>
						<p>To join the conversation, either 
							<a onClick={() => pushState(null, '/login')}>Log In</a> 
							or 
							<a onClick={() => pushState(null, '/signup')}>Sign Up</a>
						</p>
					</div>
				}
				<div id={style.notification_bar}>
					{
						typers
						.filter(typer => {
							if(typer.username !== user.username 
								&& typer.feed_id === feed.id) {
								return typer
							}
						}).map(typer => {
							return (
								<p>
									{typer.username}
								</p>
							);
						})
					}
				</div>
			</div>
		);
	}
}
