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
		isMouseOverBranch: false
	}

	componentDidMount() {
		const { index } = this.props;
		if(index == 0) this.setState({collapsed: false});
	}

	render() {
		const { index, branch, active, activeFeed, feeds } = this.props,
		{ collapsed, isMouseOverBranch } = this.state,
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
						/>
						<div 
						 id={style.accordion}
						 className={collapsed ? style.collapsed : style.expanded}>
							<FeedList
								feeds={feeds}
								activeFeed={activeFeed}
								onChangeActiveFeed={this.props.onChangeActiveFeed}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
