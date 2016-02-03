import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';

import * as popoverActions from '../../redux/modules/misc';

@connect(state => ({

	}),
	dispatch => ({
		...bindActionCreators({
			...popoverActions
		}, dispatch)
	})
)
export default class FeedPadder extends Component {
	static propTypes = {
	}

	state = {
		paddingContentHeight: ''
	}

	componentDidMount() {
		window.addEventListener('resize', ::this.updatePaddingContentHeight)
		this.updatePaddingContentHeight()
	}

	componentDidUpdate(prevProps, prevState) {
		const node = this.refs.padding_content;
		if(this.state.paddingContentHeight !== node.clientHeight) this.updatePaddingContentHeight()
	}

	updatePaddingContentHeight() {
		const node = this.refs.padding_content;
		console.log(node.clientHeight)
		this.setState({
			paddingContentHeight: node.clientHeight
		});
	}

	componentWillUnmount() {
		window.removeEventListener('resize', ::this.updatePaddingContentHeight)
	}

	openSharePopover() {
		const { branch, openPopover } = this.props;
		const node = this.refs.feed_share_link;
		openPopover('feed_share', 'right', node, branch)
	}

	render() {
		const { feed, branch, appHeight, feedHeight, feedWidth } = this.props;
		const { paddingContentHeight } = this.state;
		const style = require('./FeedPadder.scss');
		let height;
		// if(feedHeight - paddingContentHeight > 0) height = feedHeight - paddingContentHeight
		// else height = 0
		if(feedWidth > 850) height = feedHeight - 185
		else height = feedHeight - 205

		const wordsinbranch = branch.title.indexOf(' ') !== -1 ? branch.title.split(' ') : branch.title
		const firstletters = [];
		let initials;
		if(Array.isArray(wordsinbranch)) {
			wordsinbranch.forEach(word => firstletters.push(word.charAt(0)))
			initials = firstletters.reduce((a, b) => {return a + b})
		} else {
			initials = wordsinbranch.charAt(0)
		}

		return (
			<div style={{height: ''}} id={style.feed_padder_wrapper}>
				<div id={style.feed_padder_div} className="relative">
					<div style={{height: height}} id={style.feed_padder}></div>
					<div ref="padding_content" id={style.feed_padder_content}>
						<div id={style.feed_content}>
							<span id={style.feed_icon}>
								<span 
									id={style.feed_icon_circle} 
									className="circle">
									{initials.toUpperCase()}
								</span>
							</span>
							<span id={style.feed_meta}>
								<h1 className={style.feed_name}>
									{feed.title}
								</h1>
								<p id={style.feed_info}>This is the very beginning of the <a>{feed.title}</a> feed, within the <a>{branch.title}</a> branch.</p>
							</span>
							<ul className={style.feed_actions}>
								<li className="inline_block"> 
									<a onClick={::this.openSharePopover} ref="feed_share_link" className={style.feed_action}>
										<span style={{marginRight: '5px'}} className="fa fa-user-plus"></span>
										Invite others to this feed
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
