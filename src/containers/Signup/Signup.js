import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

@connect(
	state => ({
		user: state.auth.user
	}),
	dispatch => ({
		...bindActionCreators({
			pushState
		}, dispatch)
	})
)
export default class Signup extends Component {
	static propTypes = {
	}

	componentWillReceiveProps(nextProps) {
		if(!this.props.user && nextProps.user) {
			this.props.pushState(null, '/')
		}
	}

	render() {
		const { pushState } = this.props;
		const style = require('./Signup.scss');
		return (
			<div style={{height: '100%', width: '100%', background: '#fafafa'}} className="display_flex flex_center">
				<div style={{width: '355px', minWidth: '350px'}} className="flex_align_center">
					<div className="form_card" id={style.sign_up_wrapper}>
						<h2 className='form_header'>Sign Up</h2>
						<SignUpForm shouldFocus={true} landing={false}/>
					</div>
					<p className="form_note">Already have an account?<a onClick={() => pushState(null, '/login')}> Log In </a></p>
				</div>
			</div>
		);
	}
}
