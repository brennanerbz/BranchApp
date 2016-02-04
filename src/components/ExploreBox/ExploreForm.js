import React, { Component, PropTypes } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

export default class ExploreForm extends Component {
	static propTypes = {
	}

	state = {
		text: '',
		creating: false
	}

	handleOpenBranch() {
		const { pushState, params } = this.props;
		const { text } = this.state;
		if(text.length > 0) {
			this.setState({
				creating: true
			});
			setTimeout(() => {
				this.setState({
					creating: false
				});
			}, 500)
			this.props.closeOnboarding()
			if(params.branch_name !== text) {
				pushState(null, `/${text}/general`)
			} else {
				socket.emit('go to parent', {
					title: text
				})
			}
			this.setState({
				text: ''
			});
		}
	}

	tooltip(text) {
		return (
			<Tooltip id={'branch' + text}><b>{text}</b></Tooltip>
		)
	}

	render() {
		const { text, creating } = this.state;
		const style = require('./ExploreBox.scss');
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
						style={{
							fontSize: creating ? '1.1em' : '0.9em'
						}}
						id={style.explore_icon} 
						className={creating ? 'fa fa-spin fa-spinner' : 'fa fa-arrow-right'}></span>
					</OverlayTrigger>
				</form>
			</span>
		);
	}
}
