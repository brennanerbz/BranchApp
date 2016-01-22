import React, { Component, PropTypes } from 'react';

export default class BranchIcon extends Component {
	static propTypes = {
	}

	render() {
		const { active } = this.props,
		style = require('./BranchAccordion.scss');
		return (
			<div 
			onClick={this.props.expandAccordion}
			className={style.branch_icon + ' ' + (active ? style.branch_icon_active : '')}>
				<span className={'circle' + ' ' + (active ? style.active : style.inactive)}>FB</span>
			</div>
		);
	}
}
