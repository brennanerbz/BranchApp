import React, { Component, PropTypes } from 'react';
import BranchAccordion from '../../components/BranchAccordion/BranchAccordion';

export default class Navigation extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div>
				<h1>Navigation</h1>
				{Array.from({length: 2}).map(a => {
					return <BranchAccordion/>
				})}
			</div>
		);
	}
}