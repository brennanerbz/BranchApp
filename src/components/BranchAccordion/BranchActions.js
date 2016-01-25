import React, { Component, PropTypes } from 'react';

export default class BranchActions extends Component {
	static propTypes = {
	}

	render() {
		const { collapsed, isMouseOverBranch } = this.props,
		style = require('./BranchAccordion.scss');
		return(
			<div className={style.branch_actions}>
				{ /* Actions for a collapsed branch */}
				{
					collapsed 
					&&
					isMouseOverBranch
					&&
					<i 
					style={{
						fontSize: '14px', 
						marginRight: '9px', 
						marginTop: '7px'
					}} 
					className="fa fa-times"></i>
				}
				{ /* Actions for an expanded branch */}
				{
					!collapsed
					&&
					<button style={{lineHeight: '26px'}} className="button outline circle">
						<i className="fa fa-user-plus"></i>
					</button>
				}
				{
					!collapsed
					&&
					<button onClick={() => this.props.openNewFeed()} className="button outline circle">
						<i className="fa fa-plus"></i>
					</button>
				}
			</div>
		);
	}
}
