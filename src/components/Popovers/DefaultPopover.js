import React, { Component, PropTypes } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';

import { isEmpty } from '../../utils/validation';
import * as popoverActions from '../../redux/modules/misc';

@connect(
  state => ({
  	open: state.misc.popoverOpen,
  	type: state.misc.popoverType,
  	target: state.misc.targetComponent
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

	state = {
	}

	render() {
		const { open, type, target } = this.props;
		const style = require('./Popover.scss');
		const hiddenTarget = isEmpty(target);
		let node;
		if(!hiddenTarget) node = target.getBoundingClientRect(); 
		return (
			<div className={open ? '' : 'hidden'}>
				{
					!hiddenTarget
					&&
					<Popover 
						id={node.top}
						placement={'right'}
						title={'Instant invite'}
						positionLeft={node.left + 30} 
						positionTop={node.top - 40}>
						<h1>Instant invite</h1>
				    </Popover>
				}
		    </div>
		);
	}
}
