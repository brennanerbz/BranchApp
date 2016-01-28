const Account = (props) => {
	const style = require('./Modal.scss');
	return (
		<div className={style.update_account}>
			<div className={style.form}>
				<div className={style.label_wrapper}>
					<label>Old password</label>
				</div>
				<div className={style.form_input}>
					<input type="text" />
				</div>
			</div>
			<div className={style.form}>
				<div className={style.label_wrapper}>
					<label>New password</label>
				</div>
				<div className={style.form_input}>
					<input type="text" />
				</div>
			</div>
			<div className={style.form}>
				<div className={style.label_wrapper}>
					<label>Confirm new password</label>
				</div>
				<div className={style.form_input}>
					<input type="text" />
				</div>
			</div>
			<button className='button primary'>Update password</button>
		</div>
	);
}
export default Account;