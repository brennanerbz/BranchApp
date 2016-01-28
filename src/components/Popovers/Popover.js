import React, { Component, PropTypes } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';

import * as onBoardingActions from '../../redux/modules/user';

@connect(
  state => ({
  	user: state.auth.user,
  	onboarded: state.user.onboarded,
  	popovers: state.user.popovers,
  	index: state.user.onboardingPopoverIndex
  }),
  dispatch => ({
    ...bindActionCreators({
      ...onBoardingActions,
      pushState
    }, dispatch)
  })
)
export default class BranchPopover extends Component {
	static propTypes = {
	}

	state = {
	}

	render() {
		const { onboarded, index, popovers } = this.props;
		const style = require('./Popover.scss');
		const activePopover = popovers[index]
		return (
			<div className={onboarded ? 'hidden' : ''}>
				<Popover 
					id={activePopover.title}
					placement={activePopover.placement}
					title={activePopover.title}
					arrowOffsetLeft={activePopover.arrowLeft}
					arrowOffsetTop={activePopover.arrowTop}
					positionLeft={activePopover.left} 
					positionTop={activePopover.top}>
					<div className={style.onboard_content}>
						<div className={style.onboard_body}>
							<p>
								{activePopover.content} 
							</p> 
							<p>
								<b>Tip: </b>
								{activePopover.tip}
							</p>
						</div>
						<div className={'clearfix ' + style.onboard_footer}>
							<span 
							onClick={() => {
								this.props.closeOnboarding()
							}}
							style={{lineHeight: '33px'}} 
							className="float_left"><a>Skip the tour</a></span>
		           			<button 
		           				onClick={() => {
		           					if(index < popovers.length - 1) {
		           						this.props.nextOnboardingPopover()
		           					} else {
		           						this.props.closeOnboarding()
		           					}
		           				}}
		           				className="button primary float_right">
		           				Got it
		           			</button>
		           		</div>
		           </div>
			    </Popover>
		    </div>
		);
	}
}
