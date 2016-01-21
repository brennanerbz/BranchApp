import React, { Component, PropTypes } from 'react';

export default class BranchSignal extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./BranchAccordion.scss');
		return(
			<div className={style.branch_signal}>
				<span className="glyphicon glyphicon-ok-circle"></span>
			</div>
		);
	}
}