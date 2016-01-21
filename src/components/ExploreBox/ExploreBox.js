import React, { Component, PropTypes } from 'react';

import ExploreForm from './ExploreForm'

export default class ExploreBox extends Component {
	static propTypes = {
	}

	render() {
		const styles = require('./ExploreBox.scss'),
		branchLogo = require('./SlackLogo.png');
		return (
			<div className={styles.explore_box + ' float_left'}>
				<span id="branch_logo_wrapper" className="inline_block">
					<img id={styles.branch_logo} src={branchLogo}/>
				</span>
				<ExploreForm/>
				<span id={styles.open_branch_button_wrapper} className="inline_block">
					<button 
						type="button" 
						id="open_branch_button"
						className="button outline">
						<span 
						id={styles.open_branch_icon}
						className="glyphicon glyphicon-pencil"></span>
					</button>
				</span>
			</div>
		);
	}
}
