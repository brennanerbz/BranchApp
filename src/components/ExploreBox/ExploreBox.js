import React, { Component, PropTypes } from 'react';

import GoInputContainer from './GoInputContainer'

export default class ExploreBox extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div id="explore_box">
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