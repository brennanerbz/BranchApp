import Avatar from '../Avatar/Avatar';

import React, { Component, PropTypes } from 'react';

export default class UpdateProfile extends Component {
	static propTypes = {
	}

	state = {
		name: '',
		username: '',
		email: ''
	}

	componentDidMount() {
		const { user } = this.props;
		this.setState({
			name: '',
			username: user.username,
			email: user.email
		});
	}

	render() {
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
		          			<Avatar size={70} message={false} picture={null}/>
		          		</span>
		          		<span className={'inline_block'}>
		          			<button className="button">Upload new picture</button>
		          		</span>
		          		<p>Profile pictures help other users find you</p>
		      		</div>
		      	</div>
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
		      	<button className="button primary">Save changes</button>
	      	</div>
		);
	}
}
