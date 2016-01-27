import React, { Component, PropTypes } from 'react';
import Avatar from '../Avatar/Avatar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import { logout } from '../../redux/modules/auth';

@connect(
  state => ({user: state.auth.user}),
  dispatch => ({
    ...bindActionCreators({
      logout,
      pushState
    }, dispatch)
  })
)
export default class UserInfo extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./UserInfo.scss');
		return (
			<div 
			onClick={() => {
				this.props.logout()
			}}
			id={style.user_info} 
			className="float_right">
				<span className="bubble_dropdown_container">
					<button ref="dropdown_target" className="button_as_link">
						<Avatar size={36} message={false}/>
						<span id={style.username} className="inline_block">
							username
					</span>
						<i
						id={style.dropdown_arrow}
						style={{fontSize: '21px'}} 
						className="fa fa-angle-down"></i>
					</button>
				</span>
			</div>
		);
	}
}
