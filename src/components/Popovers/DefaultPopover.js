import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import { Overlay, Popover } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';

import { isEmpty } from '../../utils/validation';
import * as popoverActions from '../../redux/modules/misc';

@connect(
  state => ({
  	router: state.router,
  	open: state.misc.popoverOpen,
  	type: state.misc.popoverType,
  	placement: state.misc.popoverPlacement,
  	target: state.misc.targetComponent,
  	branch: state.misc.targetBranch,
  	// feed: state.misc.targetFeed
  }),
  dispatch => ({
    ...bindActionCreators({
      ...popoverActions,
      pushState
    }, dispatch)
  })
)
export default class DefaultPopover extends Component {
	static propTypes = {
	}

	componentDidMount() {
		var self = this;
		$(document).click(function(event) { 
		    if(!$(event.target).closest('#popover').length && !$(event.target).is('#popover')) {
		    	console.log($('#popover').css('opacity'))
		        if($('#popover').css('opacity') !== '0') {
		            self.props.closePopover()
		        }
		    }        
		})
	}

	componentWillReceiveProps(nextProps) {
		if(!this.props.open && nextProps.open) {
			setTimeout(() => {
				this.refs.popover_share_input.select()
			}, 100)
		}
	}

	render() {
		const { open, type, placement, target, branch, router} = this.props;
		const style = require('./Popover.scss');
		const hiddenTarget = isEmpty(target);
		let node, shareBranchRoute, shareFeedRoute;
		let left;
		if(!hiddenTarget) { node = target.getBoundingClientRect(); }
		if(isEmpty(branch)) { shareBranchRoute = 'teambranch' }
		else {
			if(branch.title == router.params.branch_name) {
				shareBranchRoute = router.params.branch_name
				shareFeedRoute = router.params.feed_name
			} else {
				shareBranchRoute = branch.title
				shareFeedRoute = 'general'
			}
			if(type == 'feed_share') left = node.width
			else { left = 30 }
		}		
		return (
			<div id="popover" ref="popover" className={'fade ' + (open ? 'in' : '')}>
				<Popover 
					placement={placement}
					id={'share_popover'} 
					title={'Share this link to invite people'}
					positionLeft={!hiddenTarget ? node.left + left : -1000} 
					positionTop={!hiddenTarget ? node.top - 40 : -1000}>
					<input 
						style={{
							height: '32px',
							padding: '0.75em'
						}}
						onClick={() => this.refs.popover_share_input.select()}
						ref="popover_share_input"
						id="popover_share_input"
						className={'read_only_input'}
						value={`http://branch.com/${shareBranchRoute}/${shareFeedRoute}`}
					/>
			    </Popover>
			</div>
		);
	}
}


