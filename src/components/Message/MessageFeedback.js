import React, { Component, PropTypes } from 'react';

export default class MessageFeedback extends Component {
	static propTypes = {
		isMouseOverMessage: PropTypes.bool
	}

	handleVote(vote) {
		// missing membership_id
		const { user, feed, membership, message } = this.props;
		var vote = {
			user_id: '',
			membership_id: membership.id,
			feed_id: feed.id,
			message_id: message.id,
			vote: vote
		}
		console.log(vote)
		// socket.emit('post vote', vote)
	}

	render() {
		const { isMouseOverMessage, message } = this.props,
		style = require('./Message.scss');

		let count = Math.abs(message.positives - message.negatives)
		return (
			<div className={style.message_feedback}>
				<span className={'clearfix ' + style.message_feedback_wrapper}>
					{ /* Positive feedback for message */ }
					{
						isMouseOverMessage
						&&
						<div onClick={() => this.handleVote(true)} className={style.positive}>
							<i className="fa fa-thumbs-up"></i>
						</div>
					}
					{ /* Net count for feedback */}
					<div className={style.count}>
						{
							count
						}
					</div>
					{ /* Negative feedback for message */ }
					{
						isMouseOverMessage
						&&
						<div onClick={() => this.handleVote(false)} className={style.negative}>
							<i className="fa fa-thumbs-down"></i>
						</div>
					}
				</span>
			</div>
		);
	}
}
