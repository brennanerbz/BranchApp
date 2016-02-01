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

	componentDidMount() {
		const node = this.refs.popover;
		document.onclick = (e) => {
			if(node.offsetParent !== null) {
				// this.props.closePopover()
			}
		}
	}

	render() {
		const { open, type, target } = this.props;
		const style = require('./Popover.scss');
		const hiddenTarget = isEmpty(target);
		let node;
		if(!hiddenTarget) node = target.getBoundingClientRect(); 
		return (
			<div ref="popover" className={open ? '' : 'hidden'}>
				{!hiddenTarget && <Popover 
					placement={'right'}
					id={!hiddenTarget ? node.top : 'hidden'} 
					title={'Instant invite'}
					positionLeft={!hiddenTarget ? node.left + 30 : 0} 
					positionTop={!hiddenTarget ? node.top - 40 : 0}>
					<h1>Instant invite</h1>
			    </Popover>}
		    </div>
		);
	}
}
