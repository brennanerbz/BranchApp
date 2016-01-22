import React, { Component, PropTypes } from 'react';

export default class ExploreForm extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./ExploreBox.scss');
		return (
			<span id="explore_form_wrapper" className="inline_block">
				<form id={style.explore_form}>
					<div className="explore_input_wrapper">
						<input 
						type="text" 
						id={style.explore_branches}
						className={style.explore_input}
						placeholder="Open new Branch"/>
					</div>
					<span id={style.explore_icon} className="fa fa-arrow-right"></span>
				</form>
			</span>
		);
	}
}
