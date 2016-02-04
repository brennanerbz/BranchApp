import React, { Component, PropTypes } from 'react';
import Avatar from '../Avatar/Avatar';
import { isEmpty } from '../../utils/validation';
import LaddaButton from 'react-ladda';

export default class UpdateProfile extends Component {
	static propTypes = {
	}

	state = {
		username: '',
		email: '',
		isMouseOverUpload: false
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
		if(!isEmpty(username) && !isEmpty(email)) {
			if(username !== user.username) {
				this.props.handleUpdateUser()
				socket.emit('edit user', {
					user_id: user.id,
					username: username
				})
			}
			if(email !== user.email) {
				this.props.handleUpdateUser()
				socket.emit('edit user', {
					user_id: user.id,
					email: email
				})
			}
		}
	}

	handleUploadPhoto(e) {
		var self = this,
		file = e.target.files[0],
		reader = new FileReader(),
		dataURI;
		reader.onload = (upload) => {
			dataURI = upload.target.result;
	    	self.setState({
	    		dataURI: dataURI,
	    	});
	    	console.log('photo: ', dataURI)
	    	// <---- UPLOAD PHOTO HERE
	    	// self.props.uploadUserPhoto(dataURI)
	    }
	    reader.readAsDataURL(file);
	}

	render() {
		const { user, updating } = this.props;
		const style = require('./Modal.scss');
		const { name, username, email, isMouseOverUpload } = this.state;
		return (
			<div id={style.update_profile}>
				<div className={style.form}>
		      		<div className={style.label_wrapper}>
		      			<label>Profile picture</label>
		      		</div>
		      		<div className={'clearfix ' + style.form_input}>
		      			<a id={style.upload_photo_wrapper}>
			          		<span style={{cursor: 'default', marginRight: '10px'}} className="float_left">
			          			<Avatar size={70} message={false} user={user}/>
			          		</span>
			          		<span 
			          		onMouseOver={() => {this.setState({isMouseOverUpload: true})}}
			          		onMouseLeave={() => {this.setState({isMouseOverUpload: false})}}
			          		className={'inline_block relative'}>
			          			<LaddaButton 
			          			loading={updating}
			          			style={{color: isMouseOverUpload ? '#232323' : ''}}
			          			className={"button " + (updating ? 'right' : '')}
			          			buttonStyle="expand-right"
			          			spinnerSize={26}
			          			spinnerColor="#66757f">
			          				Upload new picture
			          			</LaddaButton>
			          			<div 
			          			style={{
			          				height: '100%',
			          				overflow: 'hidden',
			          				position: 'absolute',
			          				right: '0',
			          				top: '0',
			          				width: '100%'
			          			}}
			          			id={style.upload_input_wrapper}>
				          			<input 
				          			style={{
				          				bottom: '0',
				          				cursor: 'inherit',
				          				fontSize: '1000px !important',
				          				height: '300px',
				          				margin: '0',
				          				opacity: '0',
				          				padding: '0',
				          				position: 'absolute',
				          				right: '0'
				          			}}
				          			id={style.upload_photo_input}
				          			className="upload_input_button" 
				          			type="file" 
				          			onChange={::this.handleUploadPhoto}/>
			          			</div>
			          		</span>
		          		</a>
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
		      			<p style={{margin: '0'}} 
		      			className="input_note">
		      			You can only change your username twice per day. Choose wisely.
		      			</p>
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
		      	<LaddaButton 
		      	onClick={::this.updateUser}
		      	loading={updating}
		      	className={"button primary " + (updating ? 'right' : '')}
		      	buttonStyle="expand-right"
		      	spinnerSize={26}
		      	spinnerColor="#fff">
		      		Save changes
		      	</LaddaButton>
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
