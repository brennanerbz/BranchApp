import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';

import * as miscActions from '../../redux/modules/misc';
import { Modal } from 'react-bootstrap';
import Settings from './Settings';

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
			<Modal 
			dialogClassName={style.settings_dialog} 
			show={this.state.showModal} 
			onHide={::this.close}>
	          <Modal.Header className="clearfix">
	            <Modal.Title bsClass={'float_left modal'}>Personal settings</Modal.Title>
	            <a onClick={::this.close} className={'float_right' + ' ' + style.close}>Done</a>
	          </Modal.Header>
	          <Modal.Body bsClass={style.settings_body + ' modal'}>
	          	<Settings/>
	          </Modal.Body>
	        </Modal>
		);
	}
}