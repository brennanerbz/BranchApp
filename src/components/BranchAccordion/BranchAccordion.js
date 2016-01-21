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
		const { index } = this.props,
		style = require('./BranchAccordion.scss');
		return (
			<div className={style.branch_accordion_container}>
				<div className={style.branch_accordion_wrapper}>
					<div className={style.branch_accordion}>
						<BranchSignal active={index == 0} unread={true}/>
						<BranchIcon active={index == 0}/>
						<h3 className={style.branch_name + ' ' + (index == 0 ? style.active : style.inactive)}>
							Branch name
						</h3>
						<BranchActions/>
						{
							Array.from({length: 3}).map((b, i) => {
								return <FeedItem key={i}/>
							})
						}
					</div>
				</div>
			</div>
		);
	}
}
