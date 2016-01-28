import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import { logout } from '../../redux/modules/auth';

import Avatar from '../Avatar/Avatar';
import Dropdown from '../Dropdown/Dropdown';

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
	};

	state = {
		isUserDropdownOpen: false,
		dropdownOptions: [
			{
				text: 'Settings',
				command: 'handleOpenSettingsModal'
			},
			{
				text: 'Log Out',
				command: 'handleLogOut'
			}
		]
	};

	render() {
		const { user } = this.props;
		const { isUserDropdownOpen, dropdownOptions } = this.state;
		const style = require('./UserInfo.scss');
		return (
			<div 
			onClick={() => {this.setState({isUserDropdownOpen: !isUserDropdownOpen})}}
			id={style.user_info} 
			className="float_right">
				<span className="bubble_dropdown_container">
					<button ref="dropdown_target" className="button_as_link">
						<Avatar size={36} message={false} picture={user.profile_picture}/>
						<span id={style.username} className="inline_block">
							{user.username}
					</span>
						<i
						id={style.dropdown_arrow}
						style={{fontSize: '21px'}} 
						className="fa fa-angle-down"></i>
					</button>
				</span>
				{
					isUserDropdownOpen
					&&
					<Dropdown 
						target={this.refs.dropdown_target}
						rightAlign={true}
						options={dropdownOptions}
						hideDropdown={() => this.setState({isUserDropdownOpen: false})}
						handleOpenSettingsModal={() => {
							// this.props.openModal()
						}}
						handleLogOut={() => {
							this.props.logout()
						}}
					/>
				}
			</div>
		);
	}
}
