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
		const { feedWidth, feedHeight } = this.state,
		style = require('./Feed.scss');
		return (
			<div 
			style={{height: feedHeight}}
			id={style.feed}
			className="flex_vertical flex_spacer">
				<div className={style.feed_wrapper}>
					{Array.from({length: 100}).map(m => {
						return <Message/>
					})}
				</div>
			</div>
		);
	}
}










