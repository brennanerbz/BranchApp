import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import FeedItem from '../FeedItem/FeedItem';

export default class FeedList extends Component {
	static propTypes = {
	}

	state = {
		newFeedName: 'new feed'
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
		if(newFeedName !== 'new feed' && newFeedName.length > 0) {
			this.props.createNewFeed(newFeedName)
		} else {
			this.props.closeNewFeed()
		}
		setTimeout(() => {
			this.setState({
				newFeedName: 'new feed'
			})
		}, 100)
	}

	render() {
		const { feeds, branch, memberships, activeBranch, activeFeed, onChangeActiveFeed, showInlineFeedCreation } = this.props;
		const { newFeedName } = this.state;
		const style = require('./FeedList.scss');
		return (
			<ul id={style.feed_list}>
				{
					feeds.map((feed, i) => {
						return (
							<FeedItem 
							key={'feed' + feed.id + 'index' + i} 
							index={i}
							branch={branch}
							feed={feed}
							unread={feed.unread}
							membership={memberships.filter(membership => membership.feed_id === feed.id)[0]}
							active={activeBranch && feed.title.replace("#", "") === activeFeed}
							handleChangeActiveFeed={onChangeActiveFeed}/>
						)
					})
				}
				{ /* Inline feed creation */}
				{
					showInlineFeedCreation
					&&
					<li className={'relative' + ' ' + style.feed_input_wrapper}>
						<span className={style.prefix_icon}>#</span>
						<input 
						style={{border: 'none'}}
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