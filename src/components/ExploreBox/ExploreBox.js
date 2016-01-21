import React, { Component, PropTypes } from 'react';

import GoInputContainer from './GoInputContainer'

export default class ExploreBox extends Component {
	static propTypes = {
	}

	render() {
		const styles = require('./ExploreBox.scss');
		return (
			<div style={{border: '1px solid blue'}} className={styles.explore_box + ' float_left'}>
				<h2>Explore Box</h2>
				<span id="branch_logo">
					<h4>Branch logo</h4>
				</span>
				<GoInputContainer/>
				<button 
					type="button" 
					id="open_branch_button"
					className="button outline">
					Open
				</button>
			</div>
		);
	}
}