import React, { Component, PropTypes } from 'react';
import { isEmpty } from '../../utils/validation';
import LaddaButton from 'react-ladda';

export default class Account extends Component {

	static propTypes = {

	}

	updatePassword() {
		const { user } = this.props;
		const newPw = this.refs.newPw.value;
		const newPwConfirmed = this.refs.newPwConfirmed.value;
		const oldPassword = this.refs.old_password.value;
		if(!isEmpty(newPw) && !isEmpty(newPwConfirmed) && !isEmpty(oldPassword)) {
			if(newPw === newPwConfirmed && newPw !== oldPassword) {
				this.props.handleUpdateUser()
				socket.emit('edit user', {
					user_id: user.id,
					password: newPw
				})
			}
		}
	}

	render() {
		const { user, updating } = this.props;
		const style = require('./Modal.scss');
		return (
			<div className={style.update_account}>
				<div className={style.form}>
					<div className={style.label_wrapper}>
						<label>Old password</label>
					</div>
					<div className={style.form_input}>
						<input type="password" ref="old_password"/>
					</div>
				</div>
				<div className={style.form}>
					<div className={style.label_wrapper}>
						<label>New password</label>
					</div>
					<div className={style.form_input}>
						<input type="password" ref="newPw" />
					</div>
				</div>
				<div className={style.form}>
					<div className={style.label_wrapper}>
						<label>Confirm new password</label>
					</div>
					<div className={style.form_input}>
						<input type="password" ref="newPwConfirmed" />
					</div>
				</div>
				<LaddaButton 
				onClick={::this.updatePassword}
				loading={updating}
				className={"button primary " + (updating ? 'right' : '')}
				buttonStyle="expand-right"
				spinnerSize={26}
				spinnerColor="#fff">
					Update button
				</LaddaButton>
			</div>
		);
	}
}
