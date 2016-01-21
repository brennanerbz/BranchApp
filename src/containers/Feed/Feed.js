import React, { Component, PropTypes } from 'react';
import Message from '../../components/Message/MessageContainer';

export default class Feed extends Component {
	static propTypes = {
	}

	render() {
		return (
			<div 
			style={{
				border: '1px solid red'
			}}
			id="feed" 
			className="flex_vertical flex_spacer">
				<h1>Feed</h1>
				{Array.from({length: 2}).map(m => {
					return <Message/>
				})}
			</div>
		);
	}
}
