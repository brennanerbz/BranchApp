import React, { Component, PropTypes } from 'react';

export default class ExploreForm extends Component {
	static propTypes = {
	}

	state = {
		text: ''
	}

	handleOpenBranch = () => {
		const { text } = this.state;
		socket.emit('go to parent', text)
	}

	render() {
		const { text } = this.state,
		style = require('./ExploreBox.scss');
		return (
			<span id="explore_form_wrapper" className="inline_block">
				<form id={style.explore_form}>
					<div className="explore_input_wrapper">
						<input 
						type="text" 
						id={style.explore_branches}
						className={style.explore_input}
						value={text}
						placeholder="Open Branch"
						onChange={(e) => {
							this.setState({
								text: e.target.value
							});
						}}
						onKeyDown={(e) => {
							e.preventDefault()
							if(e.which == 13) {
								this.handleOpenBranch()
							}
						}}
						/>
					</div>
					<span id={style.explore_icon} className="fa fa-arrow-right"></span>
				</form>
			</span>
		);
	}
}
