import React, { Component, PropTypes } from 'react';

export default class FeedPadder extends Component {
	static propTypes = {
	}

	render() {
		const { feed, branch, appHeight, feedHeight } = this.props,
		style = require('./FeedPadder.scss');
		let height;
		if(feedHeight - 330 > 0) height = feedHeight - 330
		else height = 0
		return (
			<div style={{height: ''}} id={style.feed_padder_wrapper}>
				<div id={style.feed_padder_div} className="relative">
					<div style={{height: height}} id={style.feed_padder}></div>
					<div id={style.feed_padder_content}>
						<div id={style.feed_content}>
							<span id={style.feed_icon}>
								<span 
									id={style.feed_icon_circle} 
									className="circle">
									FB
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
									<a className={style.feed_action}>
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
