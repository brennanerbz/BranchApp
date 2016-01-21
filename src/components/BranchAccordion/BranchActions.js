import React, { Component, PropTypes } from 'react';

export default class BranchActions extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./BranchAccordion.scss');
		return(
			<div className={style.branch_actions}>
				<span className="glyphicon glyphicon-plus-sign"></span>
			</div>
		);
	}
}