import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import { isEmpty, validateEmail } from '../../utils/validation';
import * as loginActions from '../../redux/modules/auth';
import cookie from 'react-cookie';

@connect(
	state => ({
		errorOnLogIn: state.auth.errorOnLogIn,
		logInError: state.auth.logInError,
		errorData: state.auth.errorData,
		user: state.auth.user
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
		emailError: '',
		showPasswordError: false,
		passwordError: ''
	}

	componentDidMount() {
		const { errorData, logInError } = this.props;
		this.displayError(errorData, logInError)
	}


	componentWillReceiveProps(nextProps) {
		if(!this.props.errorOnLogIn && nextProps.errorOnLogIn) {
			this.props.pushState(null, '/login')
			this.displayError(nextProps.errorData, nextProps.logInError)
		}
		if(!this.props.user && nextProps.user) {
			this.setState({
				email: ''
			});
			this.refs.login_password.value = '';

			const lastBranch = cookie.load('_lastbranch', { path: '/'})
			const lastFeed = cookie.load('_lastfeed', { path: '/'})
			if(lastBranch && lastFeed) {
				this.props.pushState(null, `/${lastBranch}/${lastFeed}`)
			} else if(lastBranch && !lastFeed) {
				this.props.pushState(null, `/${lastBranch}/general`)
			}

		}
	}

	displayError(errorData, logInError) {
		if(errorData) {
			if(errorData.email) this.setState({email: errorData.email})
			if(logInError) {
				if(logInError.indexOf('email') !== -1) {
					this.setState({
						showEmailError: true,
						emailError: logInError
					})
				}
				if(logInError.indexOf('password') !== -1) {
					this.setState({
						showPasswordError: true,
						passwordError: logInError
					});
				}
			}
		}
	}

	handleSubmitLogIn() {
		const { login, pushState } = this.props;
		const { email } = this.state;
		const password = this.refs.login_password.value;
		if(isEmpty(email)) {
			this.setState({
				showEmailError: true,
				emailError: 'Please enter your email address'
			});
		}
		if(isEmpty(password)) {
			this.setState({
				showPasswordError: true,
				passwordError: 'Please enter your password'
			});
		}
		if(!isEmpty(email) && !isEmpty(password)) {
			const user = {
				email: email,
				password: password
			}
			login(user)
		}
	}

	renderInlineLogInForm() {
		const style = require('./LogInForm.scss')
		return (
			<ul className={style.inline_log_in_form}>
				<li className={style.email}>
					<label>Email</label>
					<input 
						style={{
							background: '#6E56D4',
							color: '#fff'
						}}
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
						style={{
							background: '#6E56D4',
							color: '#fff'

						}}
						ref="login_password"
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
		const { email, showEmailError, emailError, showPasswordError, passwordError } = this.state;
		const { pushState } = this.props;
		return (
			<form 
				className={style.log_in_form}
				onSubmit={(e) => {
				  	e.preventDefault()
				}}>
				<input 
					placeholder="Email"
					autoFocus={true}
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
					ref="login_password"
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
						Oh no. {emailError}.
					</p>
				}
				{
					showPasswordError
					&&
					<p className={style.error}>
						Whoa! {passwordError}.
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
