import React, { Component, PropTypes } from 'react';

export default class BranchIcon extends Component {
	static propTypes = {
	}

	render() {
		const { branch, active } = this.props;
		const style = require('./BranchAccordion.scss');
		const wordsinbranch = branch.title.indexOf(' ') !== -1 ? branch.title.split(' ') : branch.title
		const firstletters = [];
		let initials;
		if(Array.isArray(wordsinbranch)) {
			wordsinbranch.forEach(word => firstletters.push(word.charAt(0)))
			initials = firstletters.reduce((a, b) => {return a + b})
		} else {
			initials = wordsinbranch.charAt(0)
		}
		return (
			<div 
			onClick={this.props.expandAccordion}
			className={style.branch_icon + ' ' + (active ? style.branch_icon_active : '')}>
				<span className={'circle' + ' ' + (active ? style.active : style.inactive)}>{initials.toUpperCase()}</span>
			</div>
		);
	}
}
