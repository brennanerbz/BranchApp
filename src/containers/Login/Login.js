import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import LogInForm from '../../components/LogInForm/LogInForm';
import cookie from 'react-cookie';


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
export default class Login extends Component {
	static propTypes = {
	}

	componentWillReceiveProps(nextProps) {
		if(!this.props.user && nextProps.user) {
			if(!cookie.load('_lastbranch') && !cookie.load('_lastfeed')) {
				this.props.pushState(null, '/')
			}
		}
	}

	render() {
		const { pushState } = this.props;
		const style = require('./Login.scss');
		return (
			<div style={{height: '100%', width: '100%', background: '#fafafa'}} className="display_flex flex_center">
				<div style={{width: '355px', minWidth: '350px'}} className="flex_align_center">
					<div className="form_card" id={style.log_in_wrapper}>
						<h2 className='form_header'>Log In</h2>
						<LogInForm shouldFocus={true} inline={false}/>
					</div>
					<p className="form_note">Don't have an account?<a onClick={() => pushState(null, '/signup')}> Sign Up </a></p>
				</div>
			</div>
		);
	}
}
