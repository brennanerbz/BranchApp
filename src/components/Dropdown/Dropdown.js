import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

export default class Dropdown extends Component {
	static propTypes = {

	}

	state = {
		top: 0, 
		left: 0,
		width: 0
	}

	componentDidMount() {
		this.computeDropdownPosition()
		window.addEventListener('click', ::this.hide)
	}

	componentWillUnmount() {
		window.removeEventListener('click', ::this.hide)
	}

	computeDropdownPosition() {
		const { target, rightAlign } = this.props;
		const { dropdown } = this.refs;
		const targetDimensions = target.getBoundingClientRect()
		const dropdownDimensions = dropdown.getBoundingClientRect()
		if(rightAlign) {
			this.setState({
				top: targetDimensions.height + 'px',
				left: 15 + 'px',
				width: targetDimensions.width + 'px'
			});
		}
	}

	hide() {
		$(document).click((e) => {
			if(!$(e.target).closest(this.refs.dropdown).length) {
				if($(this.refs.dropdown).is(':visible')) {
					this.props.hideDropdown()
				}
			}
		})
	}

	render() {
		const { options, rightAlign } = this.props;
		const { top, left, width } = this.state;
		const style = require('./Dropdown.scss');
		return (
			<div ref="dropdown"
				 style={{ top: top, left: left, width: width}}
				 className={'inline_block ' + style.dropdown}>
				 <div className={style.dropdown_caret + ' ' + (rightAlign ? style.right_align : '')}>
				 	<span className={style.caret_outer}></span>
				 	<span className={style.caret_inner}></span>
				 </div>
				 <ul className={style.dropdown_list}>
				 	{
				 		options.map(option => {
				 			return ( 
				 				<li onClick={this.props[`${option.command}`]}
				 					className={'relative' + ' ' + style.dropdown_item}>
				 					<a>{option.text}</a>
				 				</li>
				 			);
				 		})
				 	}
				 </ul>
			</div>
		);
	}
}
