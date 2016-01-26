import React, { Component, PropTypes } from 'react';

export default class LogInForm extends Component {
	static propTypes = {
	}

	state = {
		email: '',
		password: ''
	}

	handleSubmitLogIn() {

	}

	renderInlineLogInForm() {
		const style = require('./LogInForm.scss')
		return (
			<ul className={style.inline_log_in_form}>
				<li className={style.email}>
					<label>Email</label>
					<input 
						ref="email" 
						id="email"
						type="text"
						tabIndex={1}
						value={this.state.email}
						onChange={(e) => {
							this.setState({email: e.target.value})
						}}
						/>
					<div id={style.keep_wrapper}>
						<input id={style.keep_logged_in} type="checkbox"/>
						<a>Keep me logged in</a>
					</div>
				</li>
				<li className={style.password}>
					<label>Password</label>
					<input 
						type="password" 
						tabIndex={2}
						value={this.state.password}
						onChange={(e) => this.setState({password: e.target.value})}
						onKeyDown={(e) => {
							if(e.keyCode == 13) { 
								e.preventDefault()
								::this.handleSubmitLogIn()
							}
						}}/>
					<a className={style.forgot}>Forgot password?</a> 
				</li>
				<li className={style.button_wrapper}>
					<button className="button primary"
						    onClick={::this.handleSubmitLogIn}>
						   	Log In
					</button>
				</li>
			</ul>
		)
	}

	render() {
		const { inline } = this.props,
		style = require('./LogInForm.scss')
		return (
			<div>
				{
					inline &&
					::this.renderInlineLogInForm()
				}
			</div>
		);
	}
}
