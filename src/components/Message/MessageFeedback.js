import React, { Component, PropTypes } from 'react';

export default class MessageFeedback extends Component {
	static propTypes = {
		isMouseOverMessage: PropTypes.bool
	}

	render() {
		const { isMouseOverMessage } = this.props,
		style = require('./Message.scss');
		return (
			<div className={style.message_feedback}>
				<span className={'clearfix ' + style.message_feedback_wrapper}>
					{ /* Positive feedback for message */ }
					{
						isMouseOverMessage
						&&
						<div className={style.positive}>
							<i className="fa fa-thumbs-up"></i>
						</div>
					}
					{ /* Net count for feedback */}
					<div className={style.count}>
						8
					</div>
					{ /* Negative feedback for message */ }
					{
						isMouseOverMessage
						&&
						<div className={style.negative}>
							<i className="fa fa-thumbs-down"></i>
						</div>
					}
				</span>
			</div>
		);
	}
}
