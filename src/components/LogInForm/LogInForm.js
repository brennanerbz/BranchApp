import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import { isEmpty, validateEmail } from '../../utils/validation';
import * as loginActions from '../../redux/modules/auth';

@connect(
	state => ({
		logInError: state.auth.logInError
	}),
	dispatch => ({
		...bindActionCreators({
			...loginActions,
			pushState
		}, dispatch)
	})
)
export default class LogInForm extends Component {
	static propTypes = {
	}

	state = {
		email: '',
		showEmailError: false,
		showPasswordError: false
	}

	handleSubmitLogIn() {
		const { login, pushState } = this.props;
		const { email } = this.state;
		const password = this.refs.password.value;
		if(!isEmpty(email) && !isEmpty(password)) {
			const user = {
				email: email,
				password: password
			}
			socket.emit('login', user)
			this.setState({
				email: '',
				password: ''
			});
		}
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
						ref="password"
						type="password" 
						tabIndex={2}
						onKeyDown={(e) => {
							if(e.keyCode == 13) { 
								e.preventDefault()
								this.handleSubmitLogIn()
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

	renderLogInForm() {
		const style = require('../SignUpForm/SignUpForm.scss');
		const { email, showEmailError, showPasswordError } = this.state;
		const { pushState } = this.props;
		return (
			<form 
				className={style.log_in_form}
				onSubmit={(e) => {
				  	e.preventDefault()
				  	this.handleSubmitLogIn()
				}}>
				<input 
					placeholder="Email"
					type="text"
					value={email}
					className={showEmailError ? 'error' : ''}
					onChange={(e) => {
						this.setState({
							showEmailError: false,
							email: e.target.value
						})
					}}/>
				<input 
					ref="password"
					type="password" 
					placeholder="Password"
					className={showPasswordError ? 'error' : ''}
					onChange={(e) => {
						this.setState({
							showPasswordError: false
						})
					}}
					onKeyDown={(e) => {
						if(e.which == 13) {
							e.preventDefault()
							this.handleSubmitLogIn()
						}
					}}
					/>
				<button 
					style={{width: '100%'}}
					className="button primary"
			    	onClick={::this.handleSubmitLogIn}>
					Log In
				</button>
				{
					showEmailError
					&&
					<p className={style.error}>
						Oh no. Looks like the wrong email.
					</p>
				}
				{
					showPasswordError
					&&
					<p className={style.error}>
						Whoa! Wrong password. Try again?
					</p>
				}
			</form>
		)
	}

	render() {
		const { inline } = this.props,
		style = require('./LogInForm.scss')
		if(inline) return (::this.renderInlineLogInForm())
		else return (::this.renderLogInForm())
	}
}
