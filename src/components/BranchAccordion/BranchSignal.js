import React, { Component, PropTypes } from 'react';

export default class BranchSignal extends Component {
	static propTypes = {
	}

	render() {
		const { active, unread } = this.props,
		style = require('./BranchAccordion.scss');
		return(
			<div className={style.branch_signal + ' ' + (active ? style.active : '')}>
				{ /* Unread notification */ }
				{
					unread && !active
					&&
					<span 
					style={{height: '10px', width: '10px', background: '#dc0d17'}} 
					className={'circle'}>
					</span>
				}
				
				{ /* Active branch */}
				{
					active
					&&
					<span className={style.signal}>
					</span>
				}
			</div>
		);
	}
}