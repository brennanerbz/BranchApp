import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import { bindActionCreators } from 'redux';
import { isEmpty } from '../../utils/validation';
import BranchAccordion from '../../components/BranchAccordion/BranchAccordion';

import * as branchActions from '../../redux/modules/branches';
import * as feedActions from '../../redux/modules/feeds';

@connect(
	state => ({
	}),
	dispatch => ({
		...bindActionCreators({
			...branchActions,
			...feedActions,
			pushState
		}, dispatch)
	})
)
export default class Navigation extends Component {
	static propTypes = {
	}

	state = {
		navHeight: 0
	}

	componentDidMount() {
		const { appHeight } = this.props;
		this.updateNavHeight(appHeight)
	}

	componentWillReceiveProps(nextProps) {
		const { appHeight } = this.props;
		if(appHeight !== nextProps.appHeight) this.updateNavHeight(nextProps.appHeight)
	}

	updateNavHeight(height){
		if(height !== 0) {
			this.setState({
				navHeight: height - 55
			});
		}
	}

	handleChangeActiveFeed(feed, membership) {
		const { 
			activeBranch, 
			activeFeed, 
			changeActiveBranch, 
			changeActiveFeed } = this.props;
		if(feed.parent_id !== activeBranch) changeActiveBranch(feed.parent_id)
		if(feed.id !== activeFeed) {
			changeActiveFeed(feed.id) 
			if(feed.unread) {
				this.props.markFeedRead(feed.id)
				if(feed.parent_id !== activeBranch) {
					this.props.markBranchRead(feed.parent_id)
				}
			}
			if(membership == null || membership == undefined) {
				socket.emit('join child', {
					user_id: user.id,
					parent_id: feed.parent_id,
					title: feed.title
				})
			}
		}
	}

	render() {
		const { navHeight } = this.state;
		const { branches, feeds, memberships, appHeight, activeFeed, activeBranch } = this.props;
		const style = require('./Navigation.scss');
		return (
			<div 
				style={{ height: navHeight}}
				id={style.navigation} 
				className="flex_vertical">
				<div className={style.navigation_wrapper}>
					{branches.map((branch, i) => {
						return (
							<BranchAccordion 
								key={'branch' + branch.title + branch.id + i} 
								index={i}
								branch={branch}
								active={activeBranch == branch.id}
								activeFeed={activeFeed}
								onChangeActiveFeed={::this.handleChangeActiveFeed}
								feeds={feeds.filter(feed => feed.parent_id == branch.id)}
								memberships={memberships.filter(membership => membership.feed.parent_id == branch.id)}
							/>
						)
					})}
					{(isEmpty(branches) || branches.length === 0) &&
						<div className="display_flex flex_center" id={style.branch_onboard_message}>
							<div style={{maxWidth: '80%'}} className="flex_align_center">
								<h2>No Branches</h2>
								<p>To chat, create your first branch</p>
								<button 
								onClick={() => {
									document.getElementById('branch_explore_input').focus()
								}}
								className="button outline">New Branch</button>
							</div>
						</div>
					}
				</div>
			</div>
		);
	}
}

