import React, { Component, PropTypes } from 'react';

export default class FileUpload extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./ChatFooter.scss')
		return ( 
			<a id={style.file_upload_wrapper}>
				<i className="fa fa-plus"></i>
			</a>
		);
	}
}
