import React, { Component, PropTypes } from 'react';

/* Branch components */
import BranchActions from './BranchActions';
import BranchIcon from './BranchIcon';
import BranchSignal from './BranchSignal';

import FeedList from '../FeedList/FeedList';


export default class BranchAccordion extends Component {
	static propTypes = {
	}

	state = {
		collapsed: true,
		isMouseOverBranch: false,
		showInlineFeedCreation: false,
		creatingFeed: false
	}

	componentDidMount() {
		const { index } = this.props;
		if(index == 0) this.setState({collapsed: false});
	}

	componentDidUpdate(prevProps) {
		if(prevProps.feeds.length < this.props.feeds.length) {
			setTimeout(() => {
				this.setState({
					creatingFeed: false
				});
			}, 500)
		}
	}

	handleOpenNewFeed() {
		this.setState({
			showInlineFeedCreation: true
		});
	}

	createNewFeed(feedTitle) {
		const { pushState, branch, params } = this.props;
		this.setState({
			creatingFeed: true
		});
		if(params.feed_name !== feedTitle) {
			pushState(null, `/${branch.title}/${feedTitle}`)
		} else {
			socket.emit('join child', {
			  parent_id: branch.id,
			  title: "#" + feedTitle
			})
		}
		setTimeout(() => {
			this.setState({
				showInlineFeedCreation: false
			});
		}, 50)
	}


	render() {
		const { index, branch, active, activeFeed, feeds, memberships } = this.props,
		{ collapsed, isMouseOverBranch, showInlineFeedCreation } = this.state,
		style = require('./BranchAccordion.scss');
		return (
			<div 
			onMouseOver={() => this.setState({isMouseOverBranch: true})}
			onMouseLeave={() => this.setState({isMouseOverBranch: false})}
			className={style.branch_accordion_container}>
				<div className={style.branch_accordion_wrapper}>
					<div className={style.branch_accordion}>
						<BranchSignal active={active} unread={branch.unread}/>
						<BranchIcon 
						active={active}
						branch={branch}
						expandAccordion={() => this.setState({
							collapsed: !collapsed
						})}
						/>
						<h3 
						onClick={() => {
							this.setState({
								collapsed: !collapsed
							});
						}}
						className={style.branch_name + ' ' + (active ? style.active : style.inactive)}>
							{ branch.title } 
						</h3>
						<BranchActions
							collapsed={collapsed}
							isMouseOverBranch={isMouseOverBranch}
							branch={branch}
							feeds={feeds}
							openNewFeed={::this.handleOpenNewFeed}
							openPopover={this.props.openPopover}
							closePopover={this.props.closePopover}
							creating={this.state.creatingFeed}
							user={this.props.user}
							leaveBranch={this.props.leaveBranch}
						/>
						<div 
						 id={style.accordion}
						 className={collapsed ? style.collapsed : style.expanded}>
						 	{ 
						 		// feeds.length > 0
						 		true
						 		&&
						 		<FeedList
						 			memberships={memberships}
						 			activeBranch={active}
						 			branch={branch}
						 			feeds={feeds}
						 			activeFeed={activeFeed}
						 			onChangeActiveFeed={this.props.onChangeActiveFeed}
						 			showInlineFeedCreation={showInlineFeedCreation}
						 			createNewFeed={(title) => ::this.createNewFeed(title)}
						 			closeNewFeed={() => this.setState({showInlineFeedCreation: false})}
						 		/>
						 	}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
