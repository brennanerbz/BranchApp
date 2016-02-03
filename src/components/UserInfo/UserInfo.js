import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';
import { logout } from '../../redux/modules/auth';

import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import Avatar from '../Avatar/Avatar';
import Dropdown from '../Dropdown/Dropdown';
import * as miscActions from '../../redux/modules/misc';

@connect(
  state => ({user: state.auth.user}),
  dispatch => ({
    ...bindActionCreators({
      ...miscActions,
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
	}

	tooltip(text) {
		return (
			<Tooltip id={'user_info' + text}><b>{text}</b></Tooltip>
		)
	}

	render() {
		const { user, pushState } = this.props;
		const { isUserDropdownOpen, dropdownOptions } = this.state;
		const style = require('./UserInfo.scss');
		return (
				<div 
				onClick={() => {this.setState({isUserDropdownOpen: !isUserDropdownOpen})}}
				id={style.user_info} 
				className="float_right">
					<OverlayTrigger delayShow={250} delayHide={15} placement="bottom" overlay={::this.tooltip('Profile and settings')}>
						<span className="bubble_dropdown_container">
							<button ref="dropdown_target" className="button_as_link">
								<Avatar size={36} message={false} user={user}/>
								<span id={style.username} className="inline_block">
									{user.username}
							</span>
								<i
								id={style.dropdown_arrow}
								style={{fontSize: '21px'}} 
								className="fa fa-angle-down"></i>
							</button>
						</span>
					</OverlayTrigger>
					{
						isUserDropdownOpen
						&&
						<Dropdown 
							target={this.refs.dropdown_target}
							rightAlign={true}
							options={dropdownOptions}
							hideDropdown={() => this.setState({isUserDropdownOpen: false})}
							handleOpenSettingsModal={() => {
								this.props.openModal('settings')
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
