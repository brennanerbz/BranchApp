import React, { Component, PropTypes } from 'react';
import BranchAccordion from '../../components/BranchAccordion/BranchAccordion';

export default class Navigation extends Component {
	static propTypes = {
	}

	state = {
		navHeight: 0,
	}

	componentDidMount() {
		const { appHeight } = this.props;
		this.updateNavHeight(appHeight)
	}

	componentWillReceiveProps(nextProps) {
		const { appHeight } = this.props;
		if(appHeight !== nextProps.appHeight) this.updateNavHeight(nextProps.appHeight)
	}

	updateNavHeight = (height) => {
		if(height !== 0) {
			this.setState({
				navHeight: height - 55
			});
		}
	}

	render() {
		let { navHeight } = this.state,
		{ appHeight } = this.props,
		style = require('./Navigation.scss');
		return (
			<div 
				style={{ height: navHeight}}
				id={style.navigation} 
				className="flex_vertical">
				<div className={style.navigation_wrapper}>
					{Array.from({length: 50}).map((a, i) => {
						return <BranchAccordion key={i} index={i}/>
					})}
				</div>
			</div>
		);
	}
}

