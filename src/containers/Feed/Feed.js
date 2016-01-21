import React, { Component, PropTypes } from 'react';
import Message from '../../components/Message/MessageContainer';

export default class Feed extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div id="feed">
				<h1>Feed</h1>
				{Array.from({length: 2}).map(m => {
					return <Message/>
				})}
			</div>
		);
	}
}