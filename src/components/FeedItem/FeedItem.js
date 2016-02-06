import React, { Component, PropTypes } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'react-redux';
import * as feedActions from '../../redux/modules/feeds';

@connect(state => ({

	}),
	dispatch => ({
		...bindActionCreators({
			...feedActions
		}, dispatch)
	})
)
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
		const { index, feed, branch, membership, active, unread, handleChangeActiveFeed, pushState } = this.props;
		const { isMouseOverFeedItem } = this.state;
		const style = require('./FeedItem.scss');
		return (
			<li 
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
					<span 
					onClick={() => {
						if(!membership || (membership && !membership.open)) {
							socket.emit('join child', {
							  parent_id: branch.id,
							  title: "#" + feed.title.replace('#', "")
							})
						}
						if(!active) {
							handleChangeActiveFeed(feed, membership)
						}
					}}
					style={{
						width: '140px'
					}}
					className="float_left overflow_ellipsis">
						<span className={style.prefix_icon}>#</span>
						{ feed.title.replace("#", "") }
					</span>
					{
						isMouseOverFeedItem && feed.title !== 'general' && feed.title !== '#general'
						&&
						<OverlayTrigger delayShow={500} delayHide={15} placement="bottom" overlay={::this.tooltip('Close feed')}>
							<span 
							onClick={() => {
								if(membership) {
									socket.emit('leave child', {
										feed_id: feed.id
									})
								} else {
									this.props.leaveFeed(feed.id, branch.id, pushState)
								}
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