import React, { Component, PropTypes } from 'react';

export default class BranchIcon extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./BranchAccordion.scss');
		return (
			<div className={style.branch_icon}>
				<span className={style.active + ' circle'}>FB</span>
			</div>
		);
	}
}
