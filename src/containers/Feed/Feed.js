import React, { Component, PropTypes } from 'react';
import Message from '../../components/Message/MessageContainer';

export default class Feed extends Component {
	static propTypes = {
	}

	state = {
		feedWidth: 0,
		feedHeight: 0
	}

	componentDidMount() {
		const { appHeight, appWidth } = this.props;
		this.updateFeedHeight(appHeight)
		this.updateFeedHeight(appWidth)
	}

	componentWillReceiveProps(nextProps) {
		const { appHeight, appWidth } = this.props;
		if(appHeight !== nextProps.appHeight) this.updateFeedHeight(nextProps.appHeight)
		if(appWidth !== nextProps.appWidth) this.updateFeedWidth(nextProps.appWidth)
	}

	updateFeedHeight = (height) => {
		if(height !== 0) {
			this.setState({
				feedHeight: height - 138
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
		const { feedWidth, feedHeight } = this.state;
		return (
			<div 
			style={{
				border: '1px solid red',
				height: feedHeight
			}}
			id="feed" 
			className="flex_vertical flex_spacer">
				<h1>Feed</h1>
				{Array.from({length: 2}).map(m => {
					return <Message/>
				})}
			</div>
		);
	}
}
