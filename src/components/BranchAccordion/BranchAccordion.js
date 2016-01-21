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
		const style = require('./BranchAccordion.scss');
		return(
			<div className={style.branch_accordion_item_wrapper}>
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