import React, { Component, PropTypes } from 'react';

/* Branch components */
import BranchActions from './BranchActions';
import BranchIcon from './BranchIcon';
import BranchSignal from './BranchSignal';

import FeedItem from '../FeedItem/FeedItem';


export default class BranchAccordion extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div className="branch_accordion_item_wrapper">
				<h2>Branch accordion</h2>
				<BranchSignal/>
				<BranchIcon/>
				<h3 className="branch_name">
					Branch name
				</h3>
				<BranchActions/>
				{
					Array.from({length: 3}).map(b => {
						return <FeedItem/>
					})
				}
			</div>
		);
	}
}