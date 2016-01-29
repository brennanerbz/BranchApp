import React, { Component, PropTypes } from 'react';
import FeedItem from '../FeedItem/FeedItem';

export default class FeedList extends Component {
	static propTypes = {
	}

	state = {
		newFeedName: 'New Feed'
	}

	componentWillReceiveProps(nextProps) {
		const { showInlineFeedCreation } = nextProps;
		if(!this.props.showInlineFeedCreation && showInlineFeedCreation) {
			setTimeout(() => {
				this.refs.feed_input.select()
			}, 10)
		}
	}

	handleCreateNewFeed() {
		const { newFeedName } = this.state;
		if(newFeedName !== 'New Feed' && newFeedName.length > 0) {
			this.props.createNewFeed()
		} else {
			this.props.closeNewFeed()
		}
		setTimeout(() => {
			this.setState({
				newFeedName: 'New Feed'
			})
		}, 100)
	}

	render() {
		const { feeds, memberships, activeFeed, onChangeActiveFeed, showInlineFeedCreation } = this.props,
		{ newFeedName } = this.state,
		style = require('./FeedList.scss');
		return (
			<ul id={style.feed_list}>
				{
					feeds.map((feed, i) => {
						return (
							<FeedItem 
							key={feed.id + i} 
							index={i}
							feed={feed}
							membership={memberships.filter(membership => membership.feed_id === feed.id)}
							active={feed.id == activeFeed}
							changeActiveFeed={onChangeActiveFeed}/>
						)
					})
				}
				{ /* Inline new feed creation */}
				{
					showInlineFeedCreation
					&&
					<li className={'relative' + ' ' + style.feed_input_wrapper}>
						<span className={style.prefix_icon}>#</span>
						<input 
						ref="feed_input" 
						autoFocus={true} 
						type="text" 
						value={newFeedName}
						onChange={(e) => this.setState({newFeedName: e.target.value})}
						onKeyDown={(e) => { 
							if(e.which == 13) {
								e.preventDefault() 
								this.handleCreateNewFeed()
						}}}
						placeholder="Enter name here"
						onBlur={::this.handleCreateNewFeed}/>
					</li>
				}
			</ul>
		);
	}
}