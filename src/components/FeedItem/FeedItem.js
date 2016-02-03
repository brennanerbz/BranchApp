import React, { Component, PropTypes } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';


export default class FeedItem extends Component {
	static propTypes = {
	}

	state = {
		isMouseOverFeedItem: false
	}

	joinFeed() {

	}

	tooltip(text) {
		return (
			<Tooltip id={'branch' + text}><b>{text}</b></Tooltip>
		)
	}

	render() {
		const { index, feed, membership, active, unread, changeActiveFeed} = this.props;
		const { isMouseOverFeedItem } = this.state;
		const style = require('./FeedItem.scss');
		return (
			<li 
			onClick={() => {
				if(!active) changeActiveFeed(feed, membership)
			}}
			onMouseOver={() => {
				this.setState({isMouseOverFeedItem: true})
			}}
			onMouseLeave={() => {
				this.setState({isMouseOverFeedItem: false})
			}}
			className={'feed' + 
			index + ' ' + 
			style.feed + ' ' + 
			(active ? style.active : '') + ' ' +
			(unread ? style.unread : '')}>
				<a className={style.feed_name}>
					<span className="float_left overflow_ellipsis">
						<span className={style.prefix_icon}>#</span>
						{ feed.title.replace("#", "") }
					</span>
					{
						isMouseOverFeedItem
						&&
						<OverlayTrigger delayShow={500} delayHide={15} placement="bottom" overlay={::this.tooltip('Close feed')}>
							<span 
							onClick={() => {
								console.log('leave child with feed_id', feed.id)
								socket.emit('leave child', {
									feed_id: feed.id
								})
							}}
							className={'float_right ' + style.feed_item_actions}>
								<i 
								style={{
									fontSize: '14px', 
									lineHeight: '17px',
									marginRight: '0px',
									marginTop: '-2px',
									color: active ? '#fff' : '#9e9ea6'
								}} 
								className="fa fa-times"></i>
							</span>
						</OverlayTrigger>
					}
				</a>
			</li>
		);
	}
}