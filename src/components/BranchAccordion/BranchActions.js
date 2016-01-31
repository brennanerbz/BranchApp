import React, { Component, PropTypes } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

export default class BranchActions extends Component {
	static propTypes = {
	}

	tooltip(text) {
		return (
			<Tooltip id={'branch' + text}><b>{text}</b></Tooltip>
		)
	}

	render() {
		const { collapsed, isMouseOverBranch } = this.props;
		const style = require('./BranchAccordion.scss');
		return(
			<div className={style.branch_actions}>
				{ /* Actions for a collapsed branch */}
				{
					collapsed 
					&&
					isMouseOverBranch
					&&
					<OverlayTrigger delayShow={500} delayHide={15} placement="bottom" overlay={::this.tooltip('Close branch')}>
						<i 
						style={{
							fontSize: '14px', 
							marginRight: '9px', 
							marginTop: '7px'
						}} 
						className="fa fa-times"></i>
					</OverlayTrigger>

				}
				{ /* Actions for an expanded branch */}
				{
					!collapsed
					&&
					<OverlayTrigger delayShow={350} delayHide={50} placement="bottom" overlay={::this.tooltip('Invite people')}>
						<button style={{lineHeight: '26px'}} className="outline circle">
							<i className="fa fa-user-plus"></i>
						</button>
					</OverlayTrigger>
				}
				{
					!collapsed
					&&
					<OverlayTrigger delayShow={350} delayHide={50} placement="bottom" overlay={::this.tooltip('Add feed')}>

						<button onClick={() => this.props.openNewFeed()} className="outline circle">
							<i className="fa fa-plus"></i>
						</button>
					</OverlayTrigger>

				}
			</div>
		);
	}
}
