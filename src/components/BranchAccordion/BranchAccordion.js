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
		showInlineFeedCreation: false
	}

	componentDidMount() {
		const { index } = this.props;
		if(index == 0) this.setState({collapsed: false});
	}

	handleOpenNewFeed() {
		this.setState({
			showInlineFeedCreation: true
		});
	}

	createNewFeed() {
		console.log('new feed')
		setTimeout(() => {
			this.setState({
				showInlineFeedCreation: false
			});
		}, 50)
	}

	render() {
		const { index, branch, active, activeFeed, feeds } = this.props,
		{ collapsed, isMouseOverBranch, showInlineFeedCreation } = this.state,
		style = require('./BranchAccordion.scss');
		return (
			<div 
			onMouseOver={() => this.setState({isMouseOverBranch: true})}
			onMouseLeave={() => this.setState({isMouseOverBranch: false})}
			className={style.branch_accordion_container}>
				<div className={style.branch_accordion_wrapper}>
					<div className={style.branch_accordion}>
						<BranchSignal active={active} unread={true}/>
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
							openNewFeed={::this.handleOpenNewFeed}
						/>
						<div 
						 id={style.accordion}
						 className={collapsed ? style.collapsed : style.expanded}>
							<FeedList
								feeds={feeds}
								activeFeed={activeFeed}
								onChangeActiveFeed={this.props.onChangeActiveFeed}
								showInlineFeedCreation={showInlineFeedCreation}
								createNewFeed={() => ::this.createNewFeed()}
								closeNewFeed={() => this.setState({showInlineFeedCreation: false})}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
