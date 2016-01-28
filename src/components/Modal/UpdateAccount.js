import React, { Component, PropTypes } from 'react';

export default class Account extends Component {

	static propTypes = {

	}

	updatePassword() {
		const { user } = this.props;
		const newPw = this.refs.newPw.value;
		const newPwConfirmed = this.refs.newPwConfirmed.value;
		if(newPw === newPwConfirmed) {
			socket.emit('edit user', {
				user_id: user.id,
				password: newPw
			})
		}
	}

	render() {
		const style = require('./Modal.scss');
		return (
			<div className={style.update_account}>
				<div className={style.form}>
					<div className={style.label_wrapper}>
						<label>Old password</label>
					</div>
					<div className={style.form_input}>
						<input type="password" />
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
				<button className='button primary'>Update password</button>
			</div>
		);
	}
}
