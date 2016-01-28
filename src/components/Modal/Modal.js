import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';

import * as miscActions from '../../redux/modules/misc';
import { Modal } from 'react-bootstrap'
import Avatar from '../Avatar/Avatar';

@connect(
  state => ({
  	open: state.misc.modalOpen,
  	type: state.misc.modalType
  }),
  dispatch => ({
    ...bindActionCreators({
      ...miscActions,
      pushState
    }, dispatch)
  })
)
export default class BranchModal extends Component {
	static propTypes = {
	}

	state = {
		showModal: false
	}

	componentDidUpdate(prevProps) {
		if(!prevProps.open && this.props.open) {
			this.setState({
				showModal: true
			});
		} else if(prevProps.open && !this.props.open) {
			this.setState({
				showModal: false
			});
		}
	}

	close() {
		this.setState({showModal: false})
		this.props.closeModal()
	}

	render() {
		const style = require('./Modal.scss');
		return(
			<Modal show={this.state.showModal} onHide={::this.close}>
	          <Modal.Header className="clearfix">
	            <Modal.Title bsClass={'float_left modal'}>Settings</Modal.Title>
	            <a onClick={::this.close} className={'float_right' + ' ' + style.close}>Done</a>
	          </Modal.Header>
	          <Modal.Body>
	          	<div className={style.form}>
	          		<div className={style.label_wrapper}>
	          			<label>Profile picture</label>
	          		</div>
	          		<div className={'clearfix ' + style.form_input}>
		          		<span className="float_left">
		          			<Avatar size={70} message={false} picture={null}/>
		          		</span>
		          		<span className={'inline_block'}>
		          			<button>Upload new picture</button>
		          		</span>
	          		</div>
	          	</div>
	          	<div className={style.form}>
	          		<div className={style.label_wrapper}>
	          			<label>Name</label>
	          		</div>
	          		<div className={style.form_input}>
	          			<input type="text" />
	          		</div>
	          	</div>
	          	<div className={style.form}>
	          		<div className={style.label_wrapper}>
	          			<label>Username</label>
	          		</div>
	          		<div className={style.form_input}>
	          			<input type="text" />
	          		</div>
	          	</div>
	          	<div className={style.form}>
	          		<div className={style.label_wrapper}>
	          			<label>Email</label>
	          		</div>
	          		<div className={style.form_input}>
	          			<input type="text" />
	          		</div>
	          	</div>
	          	<div className={style.form}>
	          		<div className={style.label_wrapper}>
	          			<label>Password</label>
	          		</div>
	          		<div className={style.form_input}>
	          			<input type="text" />
	          		</div>
	          	</div>
	          </Modal.Body>
	        </Modal>
		);
	}
}