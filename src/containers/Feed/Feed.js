import React, { Component, PropTypes } from 'react';
import MessageList from '../../components/MessageList/MessageList';

export default class Feed extends Component {
	static propTypes = {
	}

	state = {
		feedWidth: 0,
		feedHeight: 0,
		messages: []
	}

	componentDidMount() {
		const { appHeight, appWidth } = this.props;
		this.updateFeedHeight(appHeight)
		this.updateFeedHeight(appWidth)
		setTimeout(() => {
			this.setState({
				messages: Array.from({length: 100})
			});
		}, 100)
	}

	componentWillReceiveProps(nextProps) {
		const { appHeight, appWidth } = this.props;
		if(appHeight !== nextProps.appHeight) this.updateFeedHeight(nextProps.appHeight)
		if(appWidth !== nextProps.appWidth) this.updateFeedWidth(nextProps.appWidth)
	}

	updateFeedHeight = (height) => {
		if(height !== 0) {
			this.setState({
				feedHeight: height - 119
			});
		}
	}

	updateFeedWidth = (width) => {
		if(width !== 0) {
			this.setState({
				feedWidth: width - 250
			});
		}
	}

	render() {
		const { feedWidth, feedHeight, messages } = this.state,
		style = require('./Feed.scss');
		return (
			<div 
			style={{height: feedHeight}}
			id={style.feed}
			className="flex_vertical flex_spacer">
				<MessageList messages={messages}/>
			</div>
		);
	}
}










