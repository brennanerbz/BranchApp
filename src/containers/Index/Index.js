import React, { Component, PropTypes } from 'react';
import { Chat, Landing } from '../'

export default class Index extends Component {
	static propTypes = {
	}

	render() {
		const { user } = this.props;
		if(user) {
			return(
				<Chat {...this.props}/>
			);
		} else {
			return (
				<Landing {...this.props}/>
			)
		}
	}
}