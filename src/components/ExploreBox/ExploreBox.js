import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';

import * as branchActions from '../../redux/modules/branches';
import * as onboardActions from '../../redux/modules/user';
import ExploreForm from './ExploreForm'

@connect(
  state => ({
  	params: state.router.params,
  	user: state.auth.user
  }),
  dispatch => ({
    ...bindActionCreators({
      ...branchActions,
      ...onboardActions,
      pushState
    }, dispatch)
  })
)
export default class ExploreBox extends Component {
	static propTypes = {
	}

	render() {
		const { onboardingPopoverIndex, pushState, params } = this.props;
		const styles = require('./ExploreBox.scss');
		const branchLogo = require('./MessengerLogo.png');
		return (
			<div ref="explore_box" className={styles.explore_box + ' float_left'}>
				<span onClick={() => pushState(null, '/')} id="branch_logo_wrapper" className="inline_block">
					<img id={styles.branch_logo} src={branchLogo}/>
				</span>
				<ExploreForm pushState={pushState} params={params} closeOnboarding={this.props.closeOnboarding}/>
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