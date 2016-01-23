import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import { bindActionCreators } from 'redux';
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

	handleChangeActiveFeed(feed){
		const { 
			activeBranch, 
			activeFeed, 
			changeActiveBranch, 
			changeActiveFeed } = this.props;
		if(feed.parent_id !== activeBranch) changeActiveBranch(feed.parent_id)
		if(feed.id !== activeFeed) changeActiveFeed(feed.id)
	}

	render() {
		let { navHeight } = this.state,
		{ branches, feeds, appHeight, activeFeed, activeBranch } = this.props,
		style = require('./Navigation.scss');
		return (
			<div 
				style={{ height: navHeight}}
				id={style.navigation} 
				className="flex_vertical">
				<div className={style.navigation_wrapper}>
					{branches.map((branch, i) => {
						return (
							<BranchAccordion 
								key={i} 
								index={i}
								branch={branch}
								active={activeBranch == branch.id}
								activeFeed={activeFeed}
								onChangeActiveFeed={::this.handleChangeActiveFeed}
								feeds={feeds.filter(feed => feed.parent_id == branch.id)}
							/>
						)
					})}
				</div>
			</div>
		);
	}
}

