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
			className={style.branch_icon}>
				<span className={'circle' + ' ' + (active ? style.active : style.inactive)}>FB</span>
			</div>
		);
	}
}
