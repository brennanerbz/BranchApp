import React, { Component, PropTypes } from 'react';

export default class FileUpload extends Component {
	static propTypes = {
	}

	render() {
		const { emptyFeed, notLoggedIn } = this.props;
		const style = require('./ChatFooter.scss')
		return ( 
			<a 
			className={emptyFeed || notLoggedIn ? style.disabled : ''}
			id={style.file_upload_wrapper}>
				<i 
				style={{
					fontSize: notLoggedIn ? '1.15em' : '0.9em'
				}}
				className={'fa ' + (notLoggedIn ? 'fa-commenting' : 'fa-plus')}></i>
			</a>
		);
	}
}
