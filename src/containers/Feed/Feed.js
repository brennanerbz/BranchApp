import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import { bindActionCreators } from 'redux';
import $ from 'jquery';

import FeedPadder from '../../components/FeedPadder/FeedPadder';
import MessageList from '../../components/MessageList/MessageList';

import * as messageActions from '../../redux/modules/messages';

@connect(
	state => ({
		messages: state.messages.messages
	}),
	dispatch => ({
		...bindActionCreators({
			...messageActions,
			pushState
		}, dispatch)
	})
)
export default class Feed extends Component {
	static propTypes = {
	}

	state = {
		feedWidth: 0,
		feedHeight: 0,
		messages: [],
		messagesDivHeight: 0
	}

	componentDidMount() {
		const { appHeight, appWidth, messages, activeFeed } = this.props;
		this.updateFeedHeight(appHeight)
		this.updateFeedHeight(appWidth)
		// socket.emit('get messages', { feed_id: activeFeed })
		this.updateMessages(messages, activeFeed)
	}

	componentWillReceiveProps(nextProps) {
		const { appHeight, appWidth } = this.props;
		if(appHeight !== nextProps.appHeight) this.updateFeedHeight(nextProps.appHeight)
		if(appWidth !== nextProps.appWidth) this.updateFeedWidth(nextProps.appWidth)

		if(this.props.activeFeed !== nextProps.activeFeed) {
			// socket.emit('get messages', { feed_id: activeFeed })
		} 
	}

	componentWillUpdate(nextProps) {
		const { messages, activeFeed } = nextProps;
		// this.updateMessages(messages, activeFeed)
		var node = this.refs.wrapper
		this.shouldScrollToBottom = node.scrollTop + node.offsetHeight === node.scrollHeight
	}

	componentDidUpdate(prevProps) {
		var node = this.refs.wrapper;
		if(this.shouldScrollToBottom) {
			node.scrollTop = node.scrollHeight;
		}
	}

	updateMessages(messages, activeFeed) {
		let filteredMessages;
		if(messages.length > 0) {
			filteredMessages = messages.filter(message => {
				return message.feed_id == activeFeed 
			})
			this.setState({
				messages: filteredMessages
			});
		}
	}

	updateFeedHeight(height) {
		if(height !== 0) {
			this.setState({
				feedHeight: height - 119
			});
		}
	}

	updateFeedWidth(width) {
		if(width !== 0) {
			this.setState({
				feedWidth: width - 250
			});
		}
	}

	render() {
		const { feed, branch } = this.props,
		{ feedWidth, feedHeight, messages, messagesDivHeight } = this.state,
		style = require('./Feed.scss');
		return (
			<div 
			style={{height: feedHeight}}
			id={style.feed}
			className="flex_vertical flex_spacer">
				<div ref="area" className={style.scrollable_area}>
					<div 
					ref="wrapper" 
					className={style.scrollable_area_wrapper}>
						<div 
						ref="body" 
						className={style.scrollable_area_body}>
							<FeedPadder
								feedHeight={feedHeight}
								messagesDivHeight={messagesDivHeight}
								feed={feed}
								branch={branch}
							/>
							<MessageList
								messages={messages}
								handleUpdateHeight={(height) => this.setState({messagesDivHeight: height})}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


