import React, { Component, PropTypes } from 'react';
import Avatar from '../Avatar/Avatar';


export default class MessageGroup extends Component {
	static propTypes = {
	}

	render() {
		const style = require('./MessageGroup.scss');
		const { group, user } = this.props;
		const isUser = group[0].user.username === user.username;
		return(
			<div 
			className={'clearfix ' + 
			style.message_group_container + ' ' + 
			(isUser ? style.user : '')}>
				<div className={style.message_avatar_wrapper}>
					<Avatar size={32} message={true} user={group[0].user}/>
				</div>
				<h5 className={style.message_sender}>
					<span className={style.sender}>{group[0].user.username}</span>
				</h5>
				<div className={style.message_group}>
					{
						group.map((message, i) => {
							return (
								<div 
								className={'text_align_ltr ' + style.message_wrapper}>
									<div className="clearfix">
										<div className={
											style.message_bubble + ' ' +  
											(i === 0 ? style.first : '') + ' ' + 
											(i === group.length - 1 ? style.last : '')
										}>
										<span className={style.message_body}>
											{message.text}
										</span>
										</div>
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		);
	}
}