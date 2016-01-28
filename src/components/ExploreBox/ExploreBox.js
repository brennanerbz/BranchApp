import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';

import * as branchActions from '../../redux/modules/branches';
import ExploreForm from './ExploreForm'

@connect(
  state => ({
  	user: state.auth.user
  }),
  dispatch => ({
    ...bindActionCreators({
      ...branchActions,
      pushState
    }, dispatch)
  })
)
export default class ExploreBox extends Component {
	static propTypes = {
	}

	render() {
		const { onboardingPopoverIndex } = this.props;
		const styles = require('./ExploreBox.scss'),
		branchLogo = require('./MessengerLogo.png');
		return (
			<div ref="explore_box" className={styles.explore_box + ' float_left'}>
				<span id="branch_logo_wrapper" className="inline_block">
					<img id={styles.branch_logo} src={branchLogo}/>
				</span>
				<ExploreForm/>
			</div>
		);
	}
}


{ /* Explore Button */ }
/*
<span id={styles.open_branch_button_wrapper} className="inline_block">
	<button 
		type="button" 
		id="open_branch_button"
		className="button outline">
		<span 
		id={styles.open_branch_icon}
		className="glyphicon glyphicon-edit"></span>
	</button>
</span>
*/