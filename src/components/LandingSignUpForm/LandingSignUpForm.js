import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import cookie from 'react-cookie';

import { isEmpty, validateEmail } from '../../utils/validation';
import * as signupActions from '../../redux/modules/auth';

@connect(state => ({
	errorOnSignUp: state.auth.errorOnSignUp,
	signUpError: state.auth.signUpError,
	errorData: state.auth.errorData,
	user: state.auth.user
	}),
	dispatch => ({
		...bindActionCreators({
			...signupActions,
			pushState
		}, dispatch)
	})
)
export default class LandingSignUpForm extends Component {
	static propTypes = {
	}

	state = {
		username: '',
		email: '',
		showUsernameError: false,
		usernameError: '',
		showEmailError: false,
		emailError: '',
		showPasswordError: false,
		passwordError: ''
	}

	componentDidMount() {
		const { errorData, signUpError } = this.props;
		this.displayError(errorData, signUpError)
	}

	componentWillReceiveProps(nextProps) {
		if(!this.props.errorOnSignUp && nextProps.errorOnSignUp) {
			this.props.pushState(null, '/signup')
			this.displayError(nextProps.errorData, nextProps.signUpError)
		}
		if(!this.props.user && nextProps.user) {
			this.setState({
				email: '',
				username: ''
			});

			this.refs.signup_password.value = '';
			const lastBranch = cookie.load('_lastbranch', { path: '/'})
			const lastFeed = cookie.load('_lastfeed', { path: '/'})
			if(lastBranch && lastFeed) {
				this.props.pushState(null, `/${lastBranch}/${lastFeed}`)
			} else if(lastBranch && !lastFeed) {
				this.props.pushState(null, `/${lastBranch}/general`)
			}
		}
	}

	componentDidUpdate() {
		const { signUpError } = this.props;
		if(!isEmpty(signUpError)) {
			this.setState({
				showUsernameError: (false ? false : false),
				showEmailError: (false ? false : false),
				showPasswordError: (false ? false : false)
			});
		}
	}

	displayError(errorData, signUpError) {
		if(errorData) {
			if(errorData.email) this.setState({email: errorData.email});
			if(errorData.username) this.setState({username: errorData.username});
			if(signUpError) {
				if(signUpError.indexOf('email') !== -1) {
					this.setState({
						showEmailError: true,
						emailError: signUpError
					})
				}
				if(signUpError.indexOf('username') !== -1) {
					this.setState({
						showEmailError: true,
						emailError: signUpError
					})
				}
				if(signUpError.indexOf('password') !== -1) {
					this.setState({
						showPasswordError: true,
						passwordError: signUpError
					});
				}
			}
		}
	}

	handleSubmitSignUp() {
		const { signup, pushState } = this.props;
		const { username, email } = this.state;
		const password = this.refs.signup_password.value;
		if(isEmpty(email)) {
			this.setState({
				showEmailError: true,
				emailError: 'Please enter your email address'
			});
		}
		if(isEmpty(username)) {
			this.setState({
				showUsernameError: true,
				usernameError: 'Please enter a username'
			});
		}
		if(isEmpty(password)) {
			this.setState({
				showPasswordError: true,
				passwordError: 'Please enter a password'
			});
		}
		if(!isEmpty(username) && !isEmpty(email) && !isEmpty(password)) {
			const validatedEmail = validateEmail(email)
			if(validatedEmail) {
		 		const newUser = {
					username: username,
					email: email,
					password: password
				}
				console.log('newUser: ', newUser)
				signup(newUser)
			} else {
				this.setState({
					showEmailError: true,
					emailError: 'Try a valid email address'
				});
			}
		}
	}

	render() {
		const style = require('../SignUpForm/SignUpForm.scss');
		const { showUsernameError, 
				usernameError, 
				showEmailError, 
				emailError, 
				showPasswordError, 
				passwordError } = this.state;
		const { pushState, 
				landing } = this.props;
		return(
			<form 
			className={style.landingSignUpForm}
			onSubmit={(e) => e.preventDefault()}>
					<input 
						placeholder="Your email"
						type="text"
						value={this.state.email}
						className={showEmailError ? 'error' : ''}
						onChange={(e) => {
							this.setState({
								showEmailError: false,
								email: e.target.value
							})
						}}/>
					<input 
						placeholder="Pick a username"
						autoFocus={this.props.shouldFocus}
						value={this.state.username}
						className={showUsernameError ? 'error' : ''}
						onChange={(e) => {
							this.setState({
								showUsernameError: false,
								username: e.target.value
							})
						}}/>
					<input 
						type="password" 
						ref="signup_password"
						placeholder="Create a password"
						className={showPasswordError ? 'error' : ''}
						onChange={(e) => {
							this.setState({
								showPasswordError: false
							})
						}}
						onKeyDown={(e) => {
							if(e.which == 13) {
								e.preventDefault()
								this.handleSubmitSignUp()
							}
						}}
						/>
					<button 
						style={{width: '100%'}}
						className="button primary"
				    	onClick={::this.handleSubmitSignUp}>
						Sign up
					</button>
					{
						showUsernameError
						&&
						<p className={style.error}>
							Oh no! {usernameError}.
						</p>
					}
					{
						showEmailError
						&&
						<p className={style.error}>
							Oops! {emailError}.
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
		);
	}
}