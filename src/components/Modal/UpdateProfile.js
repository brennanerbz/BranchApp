import React, { Component, PropTypes } from 'react';
import Avatar from '../Avatar/Avatar';

export default class UpdateProfile extends Component {
	static propTypes = {
	}

	state = {
		username: '',
		email: ''
	}

	componentDidMount() {
		const { user } = this.props;
		this.setState({
			username: user.username,
			email: user.email
		});
	}

	updateUser() {
		const { user } = this.props;
		const { username, email } = this.state;
		socket.emit('edit user', {
			user_id: user.id,
			username: username,
			email: email
		})
	}

	render() {
		const { user } = this.props;
		const style = require('./Modal.scss');
		const { name, username, email } = this.state;
		return (
			<div id={style.update_profile}>
				<div className={style.form}>
		      		<div className={style.label_wrapper}>
		      			<label>Profile picture</label>
		      		</div>
		      		<div className={'clearfix ' + style.form_input}>
		          		<span className="float_left">
		          			<Avatar size={70} message={false} user={user}/>
		          		</span>
		          		<span className={'inline_block'}>
		          			<button className="button">Upload new picture</button>
		          		</span>
		          		<p>Profile pictures help other users find you</p>
		      		</div>
		      	</div>
		      	<div className={style.form}>
		      		<div className={style.label_wrapper}>
		      			<label>Username</label>
		      		</div>
		      		<div className={style.form_input}>
		      			<input 
		      			type="text" 
		      			value={username}
		      			onChange={(e) => {
		      				this.setState({
		      					username: e.target.value
		      				});
		      			}}
		      			/>
		      		</div>
		      	</div>
		      	<div className={style.form}>
		      		<div className={style.label_wrapper}>
		      			<label>Email</label>
		      		</div>
		      		<div className={style.form_input}>
		      			<input 
		      			type="text" 
		      			value={email}
		      			onChange={(e) => {
		      				this.setState({
		      					email: e.target.value
		      				});
		      			}}
		      			/>
		      		</div>
		      	</div>
		      	<button 
		      		onClick={::this.updateUser}
		      		className="button primary">
		      		Save changes
		      	</button>
	      	</div>
		);
	}
}

/* USER'S FULL NAME 
<div className={style.form}>
	<div className={style.label_wrapper}>
		<label>Name</label>
	</div>
	<div className={style.form_input}>
		<input  
		type="text" 
		value={name}
		onChange={(e) => {
			this.setState({
				name: e.target.value
			});
		}}
		/>
	</div>
</div>
*/
