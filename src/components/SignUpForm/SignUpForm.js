import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import { isEmpty, validateEmail } from '../../utils/validation';
import * as signupActions from '../../redux/modules/auth';

@connect(
	state => ({
		signUpError: state.auth.signUpError
	}),
	dispatch => ({
		...bindActionCreators({
			...signupActions
		}, dispatch)
	})
)
export default class SignUpForm extends Component {
	static propTypes = {
	}

	state = {
		username: '',
		email: '',
		password: '',
		showUsernameError: false,
		showEmailError: false,
		showPasswordError: false
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

	handleSubmitSignUp() {
		const { signup } = this.props;
		const { username, email, password } = this.state;
		if(!isEmpty(username) && !isEmpty(email) && !isEmpty(password)) {
			const validatedEmail = validateEmail(email)
			if(validatedEmail) {
		 		const newUser = {
					username: username,
					email: email,
					password: password
				}
				socket.emit('signup', newUser)
				// signup(newUser)
				this.setState({
					username: '',
					email: '',
					password: ''
				});
			} else {
				this.setState({
					showEmailError: true
				});
			}
		}
	}

	render() {
		const style = require('./SignUpForm.scss');
		const { showUsernameError, showEmailError, showPasswordError } = this.state;
		return (
			<form 
				className={style.sign_up_form}
				onSubmit={(e) => {
				  	e.preventDefault()
				  	this.handleSubmitSignUp()
				}}>
				<input 
					placeholder="Pick a username"
					value={this.state.username}
					className={showUsernameError ? 'error' : ''}
					onChange={(e) => {
						this.setState({
							showUsernameError: false,
							username: e.target.value
						})
					}}/>
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
					type="password" 
					placeholder="Create a password"
					value={this.state.password}
					className={showPasswordError ? 'error' : ''}
					onChange={(e) => {
						this.setState({
							showPasswordError: false,
							password: e.target.value
						})
					}}
					onKeyDown={(e) => {
						if(e.which == 13) {
							e.preventDefault()
							this.handleSubmitSignUp()
						}
					}}
					/>
				<p className={style.sign_up_txt}>
					By clicking Sign Up, you agree to our &nbsp;
					<a>Terms of Service</a> and <a>Data Policy</a>
				</p>
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
						Oh no! That username is already taken!
					</p>
				}
				{
					showEmailError
					&&
					<p className={style.error}>
						Oops! Please enter a valid email.
					</p>
				}
				{
					showPasswordError
					&&
					<p className={style.error}>
						Whoa! You'll need a password to chat.
					</p>
				}
			</form>
		);
	}
}

