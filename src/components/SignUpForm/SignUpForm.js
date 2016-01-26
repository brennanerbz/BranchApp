import React, { Component, PropTypes } from 'react';

export default class SignUpForm extends Component {
	static propTypes = {
	}

	state = {
		username: '',
		email: '',
		password: ''
	}

	handleSubmitSignUp() {

	}

	render() {
		const style = require('./SignUpForm.scss')
		return (
			<form 
				className={style.sign_up_form}
				onSubmit={(e) => {
				  	e.preventDefault()
				  	::this.handleSubmitSignUp()
				}}>
				<input 
					placeholder="Pick a username"
					value={this.state.username}
					onChange={(e) => {
						this.setState({username: e.target.value})
					}}/>
				<input 
					placeholder="Your email"
					type="text"
					value={this.state.email}
					onChange={(e) => {
						this.setState({email: e.target.value})
					}}/>
				<input 
					type="password" 
					placeholder="Create a password"
					value={this.state.password}
					onChange={(e) => {
						this.setState({password: e.target.value})
					}}
					onKeyDown={(e) => {
						if(e.which == 13) {
							e.preventDefault()
							::this.handleSubmitSignUp()
						}
					}}
					/>
				<p className={style.sign_up_txt}>
					By clicking Sign Up, you agree to our &nbsp;
					<a>Terms of Service</a> and <a>Data Policy</a>
				</p>
				<button 
					className="button primary"
			    	onClick={::this.handleSubmitSignUp}>
					Sign up
				</button>
			</form>
		);
	}
}

