import React, { Component, PropTypes } from 'react';

export default class MessageFeedback extends Component {
	static propTypes = {
		isMouseOverMessage: PropTypes.bool
	}

	handleVote(vote) {
		const { user, feed, message } = this.props;
		var vote = {
			message_id: message.id,
			vote: vote
		}
		socket.emit('post vote', vote)
	}

	handleEditVote(id, vote) {
		socket.emit('edit vote', {
			vote_id: id,
			vote: vote
		})
	}

	render() {
		const { user, isMouseOverMessage, message } = this.props;
		const style = require('./Message.scss');
		var vote, positives = 0, negatives = 0, userVoted, userVotedPositive, userVotedNegative;
		for (var v = 0; v < message.votes.length; v++) {
			vote = message.votes[v];
			if(vote.vote) {
				positives++
				if(vote.user_id === user.id) userVotedPositive = vote;
			} 
			else if(vote.vote === false) {
				negatives++
				if(vote.user_id === user.id) userVotedNegative = vote;
			} else if(vote.vote === null) {
				if(vote.user_id === user.id) userVoted = vote;
			}
		}
		const count = (positives - negatives)
		return (
			<div className={style.message_feedback}>
				<span className={'clearfix ' + style.message_feedback_wrapper}>
					{ /* Positive feedback for message */ }
					{
						isMouseOverMessage
						&&
						<div onClick={() => {
								if(!userVotedPositive && !userVotedNegative && !userVoted) {
									this.handleVote(true)
								} else if (userVoted) {
									this.handleEditVote(userVoted.id, true)
								} else if (userVotedNegative && !userVotedPositive) {
									this.handleEditVote(userVotedNegative.id, true)
								} else if (userVotedPositive) {
									this.handleEditVote(userVotedPositive.id, null)
								}
							}}
							className={(userVotedPositive ? style.voted : '') + ' ' + style.positive}>
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
						<div onClick={() => {
								if(!userVotedPositive && !userVotedNegative) {
									this.handleVote(false)
								} else if (userVoted) {
									this.handleEditVote(userVoted.id, false)
								} else if (userVotedPositive && !userVotedNegative) {
									this.handleEditVote(userVotedPositive.id, false)
								} else if (userVotedNegative) {
									this.handleEditVote(userVotedNegative.id, null)
								}
							}} 
						     className={(userVotedNegative ? style.voted : '') + ' ' + style.negative}>
							<i className="fa fa-thumbs-down"></i>
						</div>
					}
				</span>
			</div>
		);
	}
}
