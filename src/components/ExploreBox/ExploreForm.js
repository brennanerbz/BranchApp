import React, { Component, PropTypes } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

export default class ExploreForm extends Component {
	static propTypes = {
	}

	state = {
		text: ''
	}

	handleOpenBranch() {
		const { text } = this.state;
		socket.emit('go to parent', {
			user_id: null,
			title: text
		})
		this.setState({
			text: ''
		});
	}

	tooltip(text) {
		return (
			<Tooltip id={'branch' + text}><b>{text}</b></Tooltip>
		)
	}

	render() {
		const { text } = this.state,
		style = require('./ExploreBox.scss');
		return (
			<span id="explore_form_wrapper" className="inline_block">
				<form id={style.explore_form}>
					<div className="explore_input_wrapper">
						<input 
						ref="explore_input"
						type="text" 
						id={'branch_explore_input'}
						className={style.explore_input}
						value={text}
						placeholder="Open Branch"
						onChange={(e) => {
							this.setState({
								text: e.target.value
							});
						}}
						onKeyDown={(e) => {
							if(e.which == 13) {
								e.preventDefault()
								this.handleOpenBranch()
							}
						}}
						/>
					</div>
					<OverlayTrigger delayShow={350} delayHide={50} placement="bottom" overlay={::this.tooltip('Click to open branch')}>
						<span 
						onClick={() => {
							if(text.length > 0) {
								this.handleOpenBranch()
							} else {
								this.refs.explore_input.focus()
							}
						}}
						id={style.explore_icon} 
						className="fa fa-arrow-right"></span>
					</OverlayTrigger>
				</form>
			</span>
		);
	}
}
