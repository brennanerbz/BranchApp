import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import { bindActionCreators } from 'redux';
import { isEmpty } from '../../utils/validation';

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
		messagesDivHeight: 0
	}

	componentDidMount() {
		const { appHeight, appWidth, activeFeed, feed } = this.props;
		this.updateFeedHeight(appHeight)
		this.updateFeedWidth(appWidth)
		var node = this.refs.wrapper;
		node.scrollTop = node.scrollHeight
		this.shouldScrollToBottom = true
	}

	componentWillReceiveProps(nextProps) {
		const { appHeight, appWidth } = this.props;
		if(appHeight !== nextProps.appHeight) this.updateFeedHeight(nextProps.appHeight)
		if(appWidth !== nextProps.appWidth) this.updateFeedWidth(nextProps.appWidth)

		if(this.props.activeFeed !== nextProps.activeFeed) {
			
		} 
	}

	componentWillUpdate(nextProps) {
		const { messages, activeFeed } = nextProps;
		var node = this.refs.wrapper
		this.shouldScrollToBottom = node.scrollTop + node.offsetHeight === node.scrollHeight
	}

	componentDidUpdate(prevProps) {
		var node = this.refs.wrapper;
		if(this.shouldScrollToBottom) {
			node.scrollTop = node.scrollHeight;
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
		const { feed, branch, membership, messages, user } = this.props;
		const { feedWidth, feedHeight, messagesDivHeight } = this.state;
		const style = require('./Feed.scss');
		return (
			<div 
			style={{height: feedHeight}}
			id={style.feed}
			className="flex_vertical flex_spacer">
				<div ref="area" className={style.scrollable_area}>
					<div 
					ref="wrapper" 
					className={style.scrollable_area_wrapper}>
						{
							!isEmpty(feed)
							&&
							<div 
							ref="body" 
							className={style.scrollable_area_body}>
								<FeedPadder
									feedHeight={feedHeight}
									feedWidth={feedWidth}
									feed={feed}
									branch={branch}
									key={'feedPadder'}
								/>
								<MessageList
									user={user}
									feed={feed}
									branch={branch}
									membership={membership}
									key={'messageList'}
									messages={messages}
								/>
							</div>
						}
						{
							isEmpty(feed)
							&&
							<div style={{height: '100%', width: '100%'}} className="display_flex flex_center">
								<div className="flex_align_center" id={style.onboard_message}>
									<h2>Empty Feed</h2>
									<p>Once you start chatting, all your messages will be here</p>
								</div>
							</div>
						}
					</div>
				</div>
			</div>
		);
	}
}


