import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';

import * as userActions from '../../redux/modules/auth';
import UpdateProfile from './UpdateProfile';
import UpdateAccount from './UpdateAccount';

@connect(
  state => ({
  	user: state.auth.user
  }),
  dispatch => ({
    ...bindActionCreators({
      ...userActions
    }, dispatch)
  })
)
export default class Settings extends Component {
	static propTypes = {
	}

	state = {
		settings: ['Profile', 'Account Settings'],
		activeSetting: 0
	}

	render() {
		const { user } = this.props;
		const { settings, activeSetting } = this.state;
		const style = require('./Modal.scss');
		return (
			<div id={style.settings_content} className="flex_horizontal">	
				<div id={style.settings_list} className="flex_vertical">
					<ul id={style.settings_tab_list}>
						{
							settings.map((setting, i)=> {
								return (
									<li 
									onClick={() => this.setState({activeSetting: i})}
									key={setting} 
									className={style.settings_tab_item + ' ' 
									+ (activeSetting == i ? style.active_setting : '')}>

										<a>{ setting }</a>

									</li>
								)
							})
						}
					</ul>
				</div>
				<div id={style.active_setting_content} className="flex_vertical">
					{
						activeSetting === 0 &&
						<UpdateProfile
							user={user}
						/>
					}
					{
						activeSetting === 1 &&
						<UpdateAccount
							user={user}
						/>
					}
				</div>
          	</div>
		);
	}
}


